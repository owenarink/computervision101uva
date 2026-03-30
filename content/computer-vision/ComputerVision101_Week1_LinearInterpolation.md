#university #computervision #week1 #theory

# Linear Interpolation

Source:
- HC1a Images and Interpolation

![[ComputerVision101_Week1_LinearInterpolation_Slide-29.png]]

## Main formula
For $x \in [k, k+1]$:

$$
\hat{f}(x) = (1-(x-k))F(k) + (x-k)F(k+1)
$$

This mixes the two neighboring samples.

## Easy meaning of the weights
Let

$$
t = x-k
$$

Then $t \in [0,1]$, so:

$$
\hat{f}(x) = (1-t)F(k) + tF(k+1)
$$

If $x$ is:
- close to $k$, then $t$ is small, so the result is closer to $F(k)$
- close to $k+1$, then $t$ is large, so the result is closer to $F(k+1)$

## Your confusion: why "fit a line" for each pair?
This is the important part.

Suppose you have many samples:

$$
F(0), F(1), F(2), F(3), \dots
$$

One single line cannot pass through all neighboring pairs unless the whole signal is already perfectly linear.

So instead we do this:

1. On the interval $[0,1]$, use the line through $(0,F(0))$ and $(1,F(1))$
2. On the interval $[1,2]$, use a different line through $(1,F(1))$ and $(2,F(2))$
3. On the interval $[2,3]$, use another line through $(2,F(2))$ and $(3,F(3))$

So you are not fitting one global line.
You are fitting **one local line per neighboring pair**.

That is why the result is called:

$$
\text{piecewise linear}
$$

## Same thing written as y = ax + b
For the interval $[k,k+1]$, a line has form

$$
y=ax+b
$$

We want it to satisfy:

$$
y(k)=F(k)
$$

$$
y(k+1)=F(k+1)
$$

From these two conditions:

$$
a = F(k+1)-F(k)
$$

and

$$
b = F(k)-ak
$$

So on this interval:

$$
y = (F(k+1)-F(k))x + F(k) - k(F(k+1)-F(k))
$$

This is algebraically the same line as the weighted-average formula above, just written in a more annoying way.

## Why linear interpolation is nicer than nearest neighbor
- it is continuous
- no sudden flat stair steps
- transitions look more natural

But:
- it is still not perfectly smooth at the sample points
- the slope can jump at each sample location

## Python
```python
import numpy as np

F = np.array([2.0, 5.0, 3.0, 7.0])

def linear_interp(F, x):
    k = int(np.floor(x))
    k = max(0, min(k, len(F) - 2))
    t = x - k
    return (1 - t) * F[k] + t * F[k + 1]

for x in [0.25, 0.5, 1.25, 2.8]:
    print(x, linear_interp(F, x))
```

## Links
- [[ComputerVision101_Week1_NearestNeighborInterpolation]]
- [[ComputerVision101_Week1_BilinearInterpolation]]

## Floor Function Intuition
In linear interpolation, the floor function is used to determine which interval contains the point $x$.

If the samples are stored at integer positions, define:

$$
k = \lfloor x \rfloor
$$

Then:
- $k$ is the left sample index
- $k+1$ is the right sample index

So if

$$
x \in [k, k+1]
$$

you interpolate between $F(k)$ and $F(k+1)$ using

$$
\hat{f}(x) = (1-(x-k))F(k) + (x-k)F(k+1)
$$

## Why The Floor Function Helps
The floor function gives the greatest integer less than or equal to $x$.

That means:
- it picks the sample immediately to the left of $x$
- it tells you which two neighboring samples to use
- it gives you a local coordinate:

$$
t = x-k
$$

which measures how far $x$ is from the left sample

## Example
If

$$
x = 2.3
$$

then

$$
k = \lfloor 2.3 \rfloor = 2
$$

So the two neighboring samples are:

$$
F(2) \text{ and } F(3)
$$

The local position is:

$$
t = x-k = 2.3-2 = 0.3
$$

So the interpolated value is:

$$
\hat{f}(2.3) = 0.7F(2) + 0.3F(3)
$$

## Why The Bounds Work
The defining property of the floor function is:

$$
\lfloor x \rfloor \le x < \lfloor x \rfloor + 1
$$

Since

$$
k = \lfloor x \rfloor
$$

this becomes:

$$
k \le x < k+1
$$

If we define

$$
k' = k+1
$$

then we also get:

$$
k \le x < k' \le k+1
$$

The last inequality is true because $k' = k+1$, so it is equality.

This is the standard bound used in linear interpolation.

## Keeping Indices In Bounds
If your sampled signal is

$$
F(0), F(1), \dots, F(N-1)
$$

then linear interpolation needs both:
- left index $k$
- right index $k+1$

So $k$ must satisfy:

$$
0 \le k \le N-2
$$

because then $k+1$ is still inside the valid array range.

A safe definition is:

$$
k = \lfloor x \rfloor
$$

followed by clamping:

$$
k = \max(0, \min(k, N-2))
$$

Then define:

$$
k' = k+1
$$

Now:
- $k \in [0, N-2]$
- $k' \in [1, N-1]$

So both indices are valid.

## Local Coordinate
Once $k$ is known, define:

$$
t = x-k
$$

Then the interpolation formula becomes:

$$
\hat{f}(x) = (1-t)F(k) + tF(k')
$$

This works because:
- if $x=k$, then $t=0$, so the output is exactly $F(k)$
- if $x$ is close to $k'$, then $t$ is close to $1$, so the output is close to $F(k')$

## Boundary Subtlety
If $x$ lies outside the valid image domain, clamping only $k$ is not always enough, because then

$$
t = x-k
$$

can become negative or bigger than $1$.

So in code, a fully safe version first clamps $x$ itself.

## Safe Python Version
```python
import numpy as np

def linear_interp(F, x):
    N = len(F)
    x = max(0.0, min(x, N - 1))
    k = int(np.floor(x))
    k = min(k, N - 2)
    k_prime = k + 1
    t = x - k
    return (1 - t) * F[k] + t * F[k_prime]
```

## CV101 F1 Solution
Problem `CV101_F1` asks:

- use the floor function to explicitly define integer numbers $k$ and $k'$ such that

$$
k \le x < k' \le k+1
$$

## Answer
Define

$$
k = \lfloor x \rfloor
$$

and then define

$$
k' = k+1
$$

Equivalently:

$$
k' = \lfloor x \rfloor + 1
$$

## Why This Is Correct
The key floor-function property is:

$$
\lfloor x \rfloor \le x < \lfloor x \rfloor + 1
$$

If we set

$$
k = \lfloor x \rfloor
$$

then this becomes

$$
k \le x < k+1
$$

Now define

$$
k' = k+1
$$

Then:

$$
k \le x < k'
$$

and also

$$
k' \le k+1
$$

because $k' = k+1$, so the last inequality is equality.

Therefore the required bound holds:

$$
k \le x < k' \le k+1
$$

## Short Explanation In Words
- $\lfloor x \rfloor$ gives the largest integer that is still less than or equal to $x$
- so it is the left integer grid point
- the next integer to the right is $k+1$
- that is exactly the right neighbor needed for linear interpolation

## Why This Theory Applies
This problem comes directly from the part of the theory where linear interpolation is defined on one interval between two consecutive samples.

That part of the theory says:

1. choose the interval containing $x$
2. use the left and right sample positions of that interval
3. mix the two sample values according to how far $x$ is between them

The floor function is what solves step 1.

It tells you which interval

$$
[k, k+1]
$$

contains $x$.

Once that is known, the interpolation formula from this note applies:

$$
\hat{f}(x) = (1-(x-k))F(k) + (x-k)F(k+1)
$$

So the floor function is not the interpolation itself.
It is the tool that identifies the correct neighboring sample locations.

## Example
If

$$
x = 2.3
$$

then

$$
k = \lfloor 2.3 \rfloor = 2
$$

and

$$
k' = 3
$$

So:

$$
2 \le 2.3 < 3 \le 3
$$

which satisfies the required inequality.
  x \leftarrow \max(0, \min(x, N-1))
  $$

  Then everything stays consistent.

  Full safe version:

  import numpy as np

  def linear_interp(F, x):
      N = len(F)
      x = max(0.0, min(x, N - 1))
      k = int(np.floor(x))
      k = min(k, N - 2)
      k_prime = k + 1
      t = x - k
      return (1 - t) * F[k] + t * F[k_prime]

  So the main rule is:

  $$
  k = \lfloor x \rfloor,\quad k=\max(0,\min(k,N-2)),\quad k'=k+1
  $$
