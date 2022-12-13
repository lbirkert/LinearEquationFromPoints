# LinearEquationFromPoints
 
This is a proof of concept demo for an algorithm which 
converts an array of points >= 2 (`x`, `y`) to a linear equation
`y = x * m + c`.

<br>

We firstly calculate the slope of each point to its left neighbour
(Note that the list must be sorted by `x`). We can now use this value
to construct the `c` for each point. (`c = y - m * x`)

We can now take the average value of both and we will
get a linear equation which is as near as possible (in theorie)
to all of the points in the list.

<br>

[Demo here](https://kotw.dev/LinearEquationFromPoints)
