#university #computervision #week1 #theory

# Bilinear Interpolation

Source:
- HC1a Images and Interpolation

![[ComputerVision101_Week1_BilinearInterpolation_Slide-38.png]]

## Idea
Bilinear interpolation is the 2D version of linear interpolation.

You have four known pixel values around a point:

$$
F(i,j),\; F(i+1,j),\; F(i,j+1),\; F(i+1,j+1)
$$

and want the value at:

$$
(x,y) = (i+a, j+b)
$$

with

$$
a,b \in [0,1]
$$

## Formula
The lecture gives:

$$
\hat{f}(x,y) =
(1-a)(1-b)F(i,j)
+ a(1-b)F(i+1,j)
+ (1-a)bF(i,j+1)
+ abF(i+1,j+1)
$$

## Easy meaning
Each corner gets a weight.

- closer corners get bigger weights
- farther corners get smaller weights
- all weights add up to 1

## Two-step view
The easiest way to understand it:

1. Interpolate horizontally on the top row
2. Interpolate horizontally on the bottom row
3. Interpolate vertically between those two intermediate values

So it is just linear interpolation done twice.

## Why it is useful
This is common when:
- resizing images
- warping images
- reading image values at non-integer coordinates

It usually looks smoother than nearest neighbor.

## Python
```python
def bilinear(F00, F10, F01, F11, a, b):
    return (
        (1 - a) * (1 - b) * F00
        + a * (1 - b) * F10
        + (1 - a) * b * F01
        + a * b * F11
    )

print(bilinear(10, 20, 30, 40, 0.25, 0.5))
```

## Links
- [[ComputerVision101_Week1_LinearInterpolation]]
- [[ComputerVision101_Week1_LocalOperators]]
