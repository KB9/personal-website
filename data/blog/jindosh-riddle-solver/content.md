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

## What is a Boolean Satisfiability Problem?

Imagine we have 3 Boolean variables $x_1$, $x_2$, and $x_3$, and a formula $F$
which uses these variables. The goal is to find the values of $x_1$, $x_2$, and 
$x_3$ that make $F$ `true`. If there exists values that can make $F$ `true`, we
say that $F$ is satisfiable.

An example of a satisfiable formula is the logical AND (written $\land$) of
these variables:

$$
F = x_1 \land x_2 \land x_3
$$

If all variables are `true`, then $F$ evaluates to `true`, making $F$
satisfiable. However, if we append a `false` to this formula:

$$
F = x_1 \land x_2 \land x_3 \land 0
$$

$F$ will **always** evaluate to `false` making this formula unsatisfiable.
Solving a Boolean satisfiability problem can thus be broken down into two
parts:
1. Can the formula $F$ ever evaluate to `true` (i.e. is it satisfiable)?
2. If it can, what values of $x_1$, $x_2$, and $x_3$ cause it to be `true`?
