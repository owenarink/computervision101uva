#university #computervision #week1 #theory

# Nearest Neighbor Interpolation

Source:
- HC1a Images and Interpolation

![[ComputerVision101_Week1_NearestNeighbor_Slide-27.png]]

## Rule
Nearest neighbor interpolation chooses the sample whose index is closest to $x$:

$$
\hat{f}(x) = F(\lfloor x + 0.5 \rfloor)
$$

This is basically rounding.

## Example
If you know samples:

$$
F(0), F(1), F(2), F(3)
$$

then:

$$
\hat{f}(0.1)=F(0)
$$

$$
\hat{f}(0.5)=F(1)
$$

$$
\hat{f}(1.2)=F(1)
$$

$$
\hat{f}(3.7)=F(4)
$$

## Why it becomes a staircase
For many nearby $x$ values, the chosen sample does not change.

Example:

$$
x \in [0.5,1.5) \Rightarrow \hat{f}(x)=F(1)
$$

So the output is constant on that whole interval.

Constant interval + sudden jump + constant interval = staircase shape.

The handwritten notes explicitly connect this with the rounding rule:

```python
round(x) == floor(x + 0.5)
```

So nearest neighbor is really "round the coordinate, then copy that sample".

## Pros
- very simple
- very fast
- preserves exact sample values

## Cons
- blocky
- jagged edges
- not smooth

## Python
```python
import numpy as np

F = np.array([2.0, 5.0, 3.0, 7.0])

def nearest_neighbor(F, x):
    k = int(np.floor(x + 0.5))
    k = max(0, min(k, len(F) - 1))
    return F[k]

for x in [0.1, 0.5, 1.2, 2.7]:
    print(x, nearest_neighbor(F, x))
```

## Links
- [[ComputerVision101_Week1_Interpolation]]
- [[ComputerVision101_Week1_LinearInterpolation]]
