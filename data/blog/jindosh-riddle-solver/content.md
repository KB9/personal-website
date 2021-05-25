If you've played Dishonored 2, you will have come across the Jindosh Riddle.
For those who haven't, it follows some variation of this:

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

## What is a Boolean Satisfiability Problem (SAT)?

Imagine we have two Boolean variables $A$ and $B$, and a formula $F$ which uses
these variables. The goal is to find the values of $A$ and $B$ that make $F$
`true`. If there exists values that can make $F$ `true`, we say that $F$ is
satisfiable.

An example of a satisfiable formula is the logical AND (written $\land$) of
these variables:

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

## Modelling the Jindosh Riddle using SAT

When modelling a Boolean satisfiability problem, there are two key components
we need to consider:
1. What are the variables?
2. What are the constraints on those variables?

Variables are the unknowns in the problem. **The goal of solving the problem is
to assign a value to each of these variables**. In the Jindosh Riddle, the key
variables we want to find are the people who own each heirloom. However, these
are not the only variables we can use to find a solution.

A constraint defines the allowed combination of values for a set of variables.
For a valid solution to be found, all constraints must be adhered to. An
example of a constraint in the Jindosh Riddle is:

> Baroness Finch was at the far left

This constraint specifies that the variable representing the person at the far
left of the table **must** have a value which is equal to the value
representing Baroness Finch.

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

Boolean formulas expressed in CNF consist of a conjunction (AND) of clauses,
with each clause being a disjunction (OR) of literals. Some examples of
formulas in CNF include:

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

## The Jindosh Riddle Formula

We don't know who is sitting where but we do know that there can only be one
person per seat.

```jindosh-grid
{
  "cols": 5,
  "rows": 1,
  "topHeaders": ["A", "B", "C", "D", "E"],
  "leftHeaders": [],
  "useFirstCell": true
}
```

We also know that each person will have one item from the following categories:
- A city of residence
- A colour of clothing
- A drink
- An heirloom

Each category can be modelled as an array containing five integers. Each
integer will represent a specific item in that category. For example:
- Lady Winslow = $0$
- Doctor Marcolla = $1$
- Countess Contee = $2$
- Madam Natsiou = $3$
- Baroness Finch = $4$

We don't know where each of these people will be sitting, therefore we don't
know where their integer ID will be in the array. With Logic Solver, we model
this like so:

```js
const personA = Logic.variableBits("personA", 4);
const personB = Logic.variableBits("personB", 4);
const personC = Logic.variableBits("personC", 4);
const personD = Logic.variableBits("personD", 4);
const personE = Logic.variableBits("personE", 4);
const peopleVars = [personA, personB, personC, personD, personE];
```

In essence, this simply creates an array with space for five integers. The
integers at each index are not specified since we don't know what they are.
This is repeated for every category until there are five variable arrays.

### Bounded Domain

The first constraint to apply to the integer variables within an array is to
specify a bounded domain. This will ensure that the integer values found in a
solution are bounded within the $[0, 4]$ range, which can be nicely mapped to
the items we have assigned to each integer value.

```js
const withinRange = (vars, lowerBound, upperBound) => {
  for (let i = 0; i < vars.length; i++) {
    solver.require(Logic.greaterThanOrEqual(vars[i], Logic.constantBits(lowerBound)));
    solver.require(Logic.lessThanOrEqual(vars[i], Logic.constantBits(upperBound)));
  }
};

withinRange(peopleVars, 0, 4);
withinRange(colorVars, 0, 4);
withinRange(drinkVars, 0, 4);
withinRange(cityVars, 0, 4);
withinRange(heirloomVars, 0, 4);
```

### Distinct Values

No two items in a category can be at the same position at the table. We apply
this constraint to each array by requiring all values to be different from
each other:

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
Logic.equalBits(drinkVars[2], beer)
```

### Items at the Same Table Position

Throughout the riddle, associations are made between the positions of items
in different categories with statements such as:

> Doctor Marcolla wore a jaunty white hat.

> I remember that red outfit because the woman spilled her absinthe all over
> it.

> The traveler from Karnaca was dressed entirely in purple.

While we can't pinpoint the precise position of these items at the table, we
know that they will be at the same position. If we wanted to apply this
constraint for the red outfit and absinthe, the following constraint could
be written:

```js
solver.require(
  Logic.or(
    Logic.and(
      Logic.equalBits(colors[0], red),
      Logic.equalBits(drinks[0], absinthe)
    ),
    Logic.and(
      Logic.equalBits(colors[1], red),
      Logic.equalBits(drinks[1], absinthe)
    ),
    Logic.and(
      Logic.equalBits(colors[2], red),
      Logic.equalBits(drinks[2], absinthe)
    ),
    Logic.and(
      Logic.equalBits(colors[3], red),
      Logic.equalBits(drinks[3], absinthe)
    ),
    Logic.and(
      Logic.equalBits(colors[4], red),
      Logic.equalBits(drinks[4], absinthe)
    )
  )
);
```

This can be generalised as a function which accepts any two arrays and values
to apply the same constraint for other categories and items.

### Items Beside Each Other at the Table

Another large amount of clues in this riddle are in the form of statements such
as:

> Someone else carried a valuable War Medal and when she saw it, the visitor
> from Dabokva next to her...

> ...the visitor from Dabokva next to her almost spilled her neighbor's rum.

> When one of the dinner guests bragged about her Ring, the woman next
> to her said they were finer in Karnaca, where she lived.

These statements all indicate that the mentioned items are beside each other at
the table. This constraint is a little trickier to write but follows the same
principle as the previous. Instead of checking for items at the same position in
two arrays, we check if an item in one array is on either side of an item in
another. Taking the Ring and Karnaca as an example:

```js
Logic.and(
  Logic.equalBits(heirloomVars[i], ring),
  Logic.or(
    Logic.equalBits(cityVars[i-1], karnaca),
    Logic.equalBits(cityVars[i+1], karnaca)
  )
);
```

We also have to consider the edge cases where the items may be at the end of
the table. To express this overall constraint over the entirety of both arrays:

```js
solver.require(
  Logic.or(
    Logic.and(
      Logic.equalBits(heirloomVars[0], ring),
      Logic.equalBits(cityVars[1], karnaca)
    ),
    Logic.and(
      Logic.equalBits(heirloomVars[1], ring),
      Logic.or(
        Logic.equalBits(cityVars[0], karnaca),
        Logic.equalBits(cityVars[2], karnaca)
      )
    ),
    Logic.and(
      Logic.equalBits(heirloomVars[2], ring),
      Logic.or(
        Logic.equalBits(cityVars[1], karnaca),
        Logic.equalBits(cityVars[3], karnaca)
      )
    ),
    Logic.and(
      Logic.equalBits(heirloomVars[3], ring),
      Logic.or(
        Logic.equalBits(cityVars[2], karnaca),
        Logic.equalBits(cityVars[4], karnaca)
      )
    ),
    Logic.and(
      Logic.equalBits(heirloomVars[4], ring),
      Logic.equalBits(cityVars[3], karnaca)
    )
  )
);
```

Much like the previous constraint, this is a specific version of a more
general function which can apply this constraint for any two arrays.

### The Solution

Calling `solver.solve()` will find the first solution which satisfies all the
specified constraints, or it will determine that no such solution is possible
based off of our constraints. You've probably already guessed that a solution
does exist though, and you'd be correct:

- Baroness Finch owns the War Medal
- Madam Natsiou owns the Ring
- Doctor Marcolla owns the Diamond
- Lady Winslow owns the Bird Pendant
- Countess Contee owns the Snuff Tin
