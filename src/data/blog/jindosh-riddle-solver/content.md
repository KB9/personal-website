*If you just want to generate a solution to the riddle instead of reading about
the implementation, [click here](/demos/jindosh-riddle-solver). Otherwise read
on!*

> ## The Jindosh Riddle
>
> At the dinner party were Lady Winslow, Doctor Marcolla, Countess Contee,
> Madam Natsiou, and Baroness Finch.
>
> The women sat in a row. They all wore different colors and Doctor Marcolla
> wore a jaunty white hat. Baroness Finch was at the far left, next to the
> guest wearing a blue jacket. The lady in red sat left of someone in green.
> I remember that red outfit because the woman spilled her absinthe all over
> it. The traveler from Karnaca was dressed entirely in purple. When one of the
> dinner guests bragged about her Ring, the woman next to her said they
> were finer in Karnaca, where she lived.
>
> So Countess Contee showed off a prized Snuff Tin, at which the lady from
> Baleton scoffed, saying it was no match for her Diamond. Someone else carried
> a valuable War Medal and when she saw it, the visitor from Dabokva next to
> her almost spilled her neighbor's rum. Madam Natsiou raised her wine in
> toast. The lady from Fraeport, full of whiskey, jumped up onto the table
> falling onto the guest in the center seat, spilling the poor woman's beer.
> Then Lady Winslow captivated them all with a story about her wild youth in
> Dunwall.
>
> In the morning there were four heirlooms under the table: the Ring, Bird
> Pendant, the Diamond, and the War Medal.
>
> But who owned each?

The solution to this riddle is required to advance to the next level. You have
two choices to find the solution:
1. Waste an enormous amount of time trying to solve the riddle for yourself.
2. Actually play the game to find a note containing the solution.

This wouldn't be a very good blog post if I took the latter option.

An interesting feature of this riddle is that it is different for each
playthrough of the game. The position of each person at the table, the colour
of their dress, the drink they have, and a couple of other properties change
depending on what version of the riddle you get. This means that there is no
single solution that will work for everyone's playthrough. To keep this post
simple, we'll focus on modelling the version of the riddle above (though the
approach can easily be extended to deal with any version).

In essence, the Jindosh Riddle specifies that there are numerous items at fixed
positions with various spatial relationships between them. As we'll see
throughout this post, this makes it a great candidate for modelling as a
Boolean satisfiability problem in order to derive a solution.

## What is a Boolean Satisfiability Problem (SAT)?

Imagine we have two Boolean variables $A$ and $B$, and a formula $F$ which uses
these variables. The goal is to find the values of $A$ and $B$ that make $F$
`true`. If there exists values that can make $F$ `true`, we say that $F$ is
satisfiable. An example of a satisfiable formula is the logical AND (written
$\land$) of these variables:

$$
F = A \land B
$$

If all variables are `true`, then $F$ evaluates to `true`, making $F$
satisfiable. However, if we append a `false` to this formula:

$$
F = A \land B \land 0
$$

$F$ will **always** evaluate to `false` making this formula unsatisfiable.
Solving a Boolean satisfiability problem can thus be broken down into two
parts:
1. Can the formula $F$ ever evaluate to `true` (i.e. is it satisfiable)?
2. If it can, what values of $A$ and $B$ cause it to be `true`?

## SAT Solvers

SAT is an NP-complete problem. A key characteristic of NP-complete problems is
that only algorithms with exponential worst-case complexity are known for
solving them. When solving NP-complete problems involving potentially thousands
of variables and conditions, conventional algorithmic approaches become
impractical to use.

In spite of this, efficient algorithms have been developed for SAT which can
scale to solve problems involving a high number of variables and constraints.
An example of a collection of such algorithms is the SAT solver
[MiniSAT](http://minisat.se).

MiniSAT is a small but efficient SAT solver which accepts formulas expressed in
conjunctive normal form (CNF), and outputs whether the formula is satisfiable
or not along with the values which satisfy the formula.

Boolean formulas expressed in CNF consist of a conjunction (logical AND written
as $\land$) of clauses, with each clause being a disjunction (logical OR
written as $\lor$) of literals. Some examples of formulas in CNF include:

- $(A \lor B) \land (C \lor D)$
- $(A \lor B) \land C$
- $(A \lor B)$
- $A$

Few problems can be naturally expressed in CNF, and the Jindosh Riddle is no
exception. We could apply
[De Morgan's laws](https://en.wikipedia.org/wiki/De_Morgan%27s_laws) to express
it in this way, though we'd still have to convert it to the DIMACS file format
expected by MiniSAT.

Rather than wasting time performing these steps, we will use
[Logic Solver](https://github.com/meteor/logic-solver). Logic Solver is
responsible for taking arbitrary Boolean formulas and converting these into
CNF. Internally, Logic Solver uses MiniSAT to determine satisfiability and the
values in a solution.

## Modelling the Jindosh Riddle using SAT

When modelling a Boolean satisfiability problem, there are two key components
we need to consider:
1. What are the variables?
2. What are the constraints on those variables?

Variables are the unknowns in the problem. **The goal of solving the problem is
to assign a value to each of these variables**. In the formula
$F = A \land B$, the variables we would need to find values for are $A$ and
$B$. In the Jindosh Riddle, the variables we want to find values for are the
people who own each heirloom. However, these are not the only variables we can
use to find a solution.

A constraint defines the allowed combination of values for a set of variables.
In the formula $F = A \land B$, the variables $A$ and $B$ are both constrained
to be `true` by the $\land$ relationship. An example of a constraint in the
Jindosh Riddle is:

> Baroness Finch was at the far left

This constraint specifies that the variable representing the person at the far
left of the table **must** have a value which is equal to the value
representing Baroness Finch. As we will see later in this post, we can express
statements like these as a Boolean formula.

## The Jindosh Riddle Formula

### Solver

Logic Solver's `Solver` is used to maintain a list of formulas that must be
true (or false), which you can think of as a list of constraints. Each `Solver`
instance embeds a self-contained MiniSat instance, which learns and remembers
facts that are derived from the constraints.

```js
const solver = new Logic.Solver();
```

When we define constraints later, we will add them to this `solver` instance.

### Variables

The first thing to consider is how we represent the variables in the Jindosh
Riddle. We know that there are five seats at the table, and that each seat
will have one item from the following categories:

- A person
- A city of residence
- A colour of clothing
- A drink
- An heirloom

If we were to visualise this, it would look something like this:
```jindosh-grid
{
  "cols": 6,
  "rows": 6,
  "topHeaders": ["Seat 0", "Seat 1", "Seat 2", "Seat 3", "Seat 4"],
  "leftHeaders": ["Person", "City", "Colour", "Drink", "Heirloom"]
}
```

Solving the Jindosh Riddle is therefore just a problem of deciding what values
go where in this grid. Though what values will we use?

When modelling a problem such as this, we tend to use integer variables. More
specifically, we can uniquely represent each item in the five identified
categories using unique integer values as IDs. For example, if we were to do
this for each person:

```js
const winslow = Logic.constantBits(0);  // winslow = 0
const marcolla = Logic.constantBits(1); // marcolla = 1
const contee = Logic.constantBits(2);   // contee = 2
const natsiou = Logic.constantBits(3);  // natsiou = 3
const finch = Logic.constantBits(4);    // finch = 4
```

This means we can represent each category as an integer array with five
unique values representing each item at a particular seat. However, we have
no way of knowing where these values will end up in each array without solving
the problem first. With Logic Solver, we model such an array like so (using
people as an example):

```js
const person0 = Logic.variableBits("person0", 3);
const person1 = Logic.variableBits("person1", 3);
const person2 = Logic.variableBits("person2", 3);
const person3 = Logic.variableBits("person3", 3);
const person4 = Logic.variableBits("person4", 3);
const peopleVars = [person0, person1, person2, person3, person4];
```

In essence, this simply creates an array with space for five integers. This is
repeated for every category until there are five variable arrays:

- `peopleVars`
- `colorVars`
- `drinkVars`
- `cityVars`
- `heirloomVars`

### Integers!? Those aren't Boolean Variables

You may have noticed the strange syntax for creating an integer variable:

```js
const variable = Logic.variableBits("label", 3);
```

With Logic Solver, integer variables are represented as a group of bits. In the
example above, we're defining a variable which can hold a value consisting of 3
bits. Each of these bits can be treated as a Boolean variable, allowing their
use in a Boolean formula. For example, if we wanted an integer variable $X$ to
be equal to the number 2 (with bits $010$), we'd write a Boolean formula such
as this:

$$
F = \neg X_0 \land X_1 \land \neg X_3
$$

Thankfully, Logic Solver abstracts all of this complexity away for us. We can
use its API to express constraints on integer variables using operators such as
equality or greater/less-than without worrying about how to map these to the
individual bits as a Boolean formula.

You may wonder why only 3 bits are used to represent our integer variables.
Given that we are mapping each item to an integer value ID in the 0-4 range for
each category, we only need 3 bits to represent all of these values.

### Bounded Domain

The first constraint to apply to the integer variables within an array is to
specify a bounded domain. This will ensure that the integer values found in a
solution are within the $[0, 4]$ range. These values can then be associated
with the item IDs we are using. Without this, incorrect solutions
containing values such as $5$, $6$, or $7$ would be considered valid (since
these values can also be represented with 3 bits).

```js
const lessThanOrEqual = (vars, upperBound) => {
  for (let i = 0; i < vars.length; i++) {
    solver.require(Logic.lessThanOrEqual(vars[i], upperBound));
  }
};

const upperBound = Logic.constantBits(4);
lessThanOrEqual(peopleVars, upperBound);
lessThanOrEqual(colorVars, upperBound);
lessThanOrEqual(drinkVars, upperBound);
lessThanOrEqual(cityVars, upperBound);
lessThanOrEqual(heirloomVars, upperBound);
```

### Distinct Values

We want to ensure that each item can only be present at one seat. To do so,
we specify that the values in each category array must be different from one
another (i.e. they must all be unique). We can specify this constraint as:

```js
const allDifferent = (vars) => {
  for (let i = 0; i < vars.length; i++) {
    for (let j = 0; j < vars.length; j++) {
      if (i !== j) {
        solver.forbid(Logic.equalBits(vars[i], vars[j]));
      }
    }
  }
};

allDifferent(peopleVars);
allDifferent(colorVars);
allDifferent(drinkVars);
allDifferent(cityVars);
allDifferent(heirloomVars);
```

### Items with Specified Positions

In the riddle, the positions of a few items are given. One example of this is:

> Baroness Finch was at the far left, next to the guest wearing a blue jacket.

We treat the first index in the arrays as the far left side of the table, and
the last index as the far right side. We use this to constrain the value of
the integer at index 0 in the `peopleVars` array to the integer value
representing Baroness Finch:

```js
solver.require(Logic.equalBits(peopleVars[0], finch));
```

Given that Baroness Finch is at index 0, the integer value representing the
blue jacket can only be at index 1 in the `colorVars` array:

```js
solver.require(Logic.equalBits(colorVars[1], blue));
```

Another clue gives the location of a drink at the table:

> ...falling onto the guest in the center seat, spilling the poor woman's beer.

We constrain the value at index 2 in the `drinksVar` array to be equal to the
integer value representing the beer:

```js
solver.require(Logic.equalBits(drinkVars[2], beer));
```

If we visualise the effect of these constraints on the values in our grid:
```jindosh-grid
{
  "cols": 6,
  "rows": 6,
  "topHeaders": ["Seat 0", "Seat 1", "Seat 2", "Seat 3", "Seat 4"],
  "leftHeaders": ["Person", "City", "Colour", "Drink", "Heirloom"],
  "cellContents": {
    "7": "Finch",
    "20": "blue",
    "27": "beer"
  }
}
```

Unfortunately, these are the only constraints which concretely tell us where
each item is at the table. However, we can use information about the relative
positioning of items to work out a unique solution.

### Items at the Same Table Position

Throughout the riddle, associations are made between the positions of items
in different categories with statements such as:

> Doctor Marcolla wore a jaunty white hat.

> I remember that red outfit because the woman spilled her absinthe all over
> it.

> The traveler from Karnaca was dressed entirely in purple.

While we can't pinpoint the precise position of these items at the table, we
know that they will be at the same position. For example, we know that Doctor
Marcolla and the white hat will be at the same position. What we mean by this
is that the value representing Doctor Marcolla in the `peopleVars` array will
have the same index as the value representing white in the `colorVars` array.
If we were to express this for index 0 only (the left-most seat), it would look
like this:

```js
Logic.and(
  Logic.equalBits(varsA[0], white),
  Logic.equalBits(varsB[0], marcolla)
)
```

To apply this constraint for all indices, we simply OR this constraint over all
possible positions. We can express this as a generic constraint like so:

```js
const requireMatchesAtSameIndex = (varsA, valueA, varsB, valueB) => {
  solver.require(
    Logic.or(
      Logic.and(
        Logic.equalBits(varsA[0], valueA),
        Logic.equalBits(varsB[0], valueB)
      ),
      Logic.and(
        Logic.equalBits(varsA[1], valueA),
        Logic.equalBits(varsB[1], valueB)
      ),
      Logic.and(
        Logic.equalBits(varsA[2], valueA),
        Logic.equalBits(varsB[2], valueB)
      ),
      Logic.and(
        Logic.equalBits(varsA[3], valueA),
        Logic.equalBits(varsB[3], valueB)
      ),
      Logic.and(
        Logic.equalBits(varsA[4], valueA),
        Logic.equalBits(varsB[4], valueB)
      )
    )
  );
};
```

We can then apply this constraint for every item which belongs at the same
position at the table. For the three statements mentioned previously:

```js
// Doctor Marcolla wore a jaunty white hat.
requireMatchesAtSameIndex(colorVars, white, peopleVars, marcolla);
// I remember that red outfit because the woman spilled her absinthe
// all over it.
requireMatchesAtSameIndex(drinkVars, absinthe, colorVars, red);
// The traveler from Karnaca was dressed entirely in purple.
requireMatchesAtSameIndex(colorVars, purple, cityVars, karnaca);
```

In total, there are 8 statements in the riddle which constrain two items to be
in the same place as one another. See if you can spot the other five!

### The Colours Next to Each Other

> The lady in red sat left of someone in green.

Implementing this constraint follows the same reasoning with which we
implemented the previous constraint. However, instead of constraining the red
and green values to exist at the same index, we constrain the colour red to be
at any possible `i-1`th index (left) of green:

```js
solver.require(
  Logic.or(
    Logic.and(
      Logic.equalBits(colorVars[0], red),
      Logic.equalBits(colorVars[1], green)
    ),
    Logic.and(
      Logic.equalBits(colorVars[1], red),
      Logic.equalBits(colorVars[2], green)
    ),
    Logic.and(
      Logic.equalBits(colorVars[2], red),
      Logic.equalBits(colorVars[3], green)
    ),
    Logic.and(
      Logic.equalBits(colorVars[3], red),
      Logic.equalBits(colorVars[4], green)
    )
  )
);
```

### Items Beside Each Other at the Table

> Someone else carried a valuable War Medal and when she saw it, the visitor
> from Dabokva next to her...

> ...the visitor from Dabokva next to her almost spilled her neighbor's rum.

> When one of the dinner guests bragged about her Ring, the woman next
> to her said they were finer in Karnaca, where she lived.

These statements all indicate that the mentioned items are beside each other at
the table. This constraint is a little trickier to write but is simply an
extension of the previous constraint. Instead of constraining an item to be on
one side of another item *only*, we extend it to allow another item to exist on
either side (but not both sides - this would conflict with the `allDifferent`
constraint we applied previously and would result in no viable solutions).
Taking the Ring and Karnaca as an example:

```js
Logic.and(
  Logic.equalBits(heirloomVars[i], ring),
  Logic.or(
    Logic.equalBits(cityVars[i-1], karnaca),
    Logic.equalBits(cityVars[i+1], karnaca)
  )
);
```

This constraint covers most of the table but not all of it. We can't use this
constraint for edge positions as `i-1` or `i+1` would exceed the bounds of the
variable array. This would leave us with two seats at which the ring can never
exist (according to our constraints). To account for these edge cases, we can
use the following constraints:

```js
// Constraint for the ring at the left-most seat, with the person
// from Karnaca to its right.
Logic.and(
  Logic.equalBits(heirloomVars[0], ring),
  Logic.equalBits(cityVars[1], karnaca)
);

// OR constraint for the ring at the right-most seat, with the person
// from Karnaca to its left.
Logic.and(
  Logic.equalBits(heirloomVars[4], ring),
  Logic.equalBits(cityVars[3], karnaca)
);
```

We can combine all of these constraints to give us a generic method for
constraining two items of different categories to be beside each other at the
table:

```js
const requireMatchesWithinSingleIndex = (varsA, valueA, varsB, valueB) => {
  solver.require(
    Logic.or(
      Logic.and(
        Logic.equalBits(varsA[0], valueA),
        Logic.equalBits(varsB[1], valueB)
      ),
      Logic.and(
        Logic.equalBits(varsA[1], valueA),
        Logic.or(
          Logic.equalBits(varsB[0], valueB),
          Logic.equalBits(varsB[2], valueB)
        )
      ),
      Logic.and(
        Logic.equalBits(varsA[2], valueA),
        Logic.or(
          Logic.equalBits(varsB[1], valueB),
          Logic.equalBits(varsB[3], valueB)
        )
      ),
      Logic.and(
        Logic.equalBits(varsA[3], valueA),
        Logic.or(
          Logic.equalBits(varsB[2], valueB),
          Logic.equalBits(varsB[4], valueB)
        )
      ),
      Logic.and(
        Logic.equalBits(varsA[4], valueA),
        Logic.equalBits(varsB[3], valueB)
      )
    )
  );
};
```

This can then be applied to the relevant statements from the riddle:

```js
// Someone else carried a valuable War Medal and when she saw it,
// the visitor from Dabokva next to her...
requireMatchesWithinSingleIndex(heirloomVars, warMedal, cityVars, dabokva);
// ...the visitor from Dabokva next to her almost spilled her
// neighbor's rum.
requireMatchesWithinSingleIndex(cityVars, dabokva, drinkVars, rum);
// When one of the dinner guests bragged about her Ring, the woman
// next to her said they were finer in Karnaca, where she lived.
requireMatchesWithinSingleIndex(heirloomVars, ring, cityVars, karnaca);
```

### The Solution

Calling `solver.solve()` will find the first solution which satisfies all the
specified constraints, or it will determine that no such solution is possible
based off of our constraints. You might have guessed that a solution does
exist:

- Baroness Finch owns the War Medal
- Madam Natsiou owns the Ring
- Doctor Marcolla owns the Diamond
- Lady Winslow owns the Bird Pendant
- Countess Contee owns the Snuff Tin

While we've focused our approach on solving one version of the riddle, you can
easily use this approach to solve any version. The only aspect of the riddle
that changes is the item at a specific position. Therefore a flexible solver
can be implemented by leaving the choice of the item up to the user. Our
constraints will take care of the rest!

## Try it Out!

I have implemented a [small demo](/demos/jindosh-riddle-solver) which
implements the solver using the techniques discussed in this blog post. You can
use it to solve any version of the Jindosh Riddle you find posted online (or
while playing Dishonored 2). For convenience, the demo allows you to generate
the version of the riddle at the beginning of this blog post so that you can see
how it works.

Alternatively, if you're interested in seeing the full implementation, you can
find the source code of the solver used for the demo
[here](https://github.com/KB9/personal-website/blob/master/services/jindosh-riddle-solver.js).
