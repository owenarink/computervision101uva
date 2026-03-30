#university #computervision #week1 #theory

# Interpolation

Source:
- HC1a Images and Interpolation
- https://rvdboomgaard.github.io/ComputerVision_LectureNotes/LectureNotes/IP/index.html

![[ComputerVision101_Week1_LinearInterpolation_Slide-29.png]]

## Core idea
After discretization, we only know image values on a grid:

$$
F(i,j)
$$

But sometimes we want the value at a location that is not exactly on the grid:

$$
f(x,y)
$$

with non-integer $x$ or $y$.

Interpolation means:

$$
\text{estimate values between known samples}
$$

## Why we need it
Interpolation is used whenever we:
- resize an image
- rotate an image
- warp an image
- sample at non-integer coordinates

## What the lecture assumes
The lecture says interpolation makes sense when the image is **well sampled**.

That means the discrete samples still contain enough information about the original signal.

The Remarkable notes phrase interpolation as an **informed guess**:
- we already lost information when going from continuous to discrete
- interpolation does not recover the true original function exactly
- it estimates reasonable values between samples

## Your confusion: "why does nearest neighbor make a staircase?"
Because nearest neighbor says:

$$
\hat{f}(x) = \text{copy the closest sample}
$$

So for a whole interval of $x$ values, the output stays exactly the same.

That produces flat horizontal pieces, which look like stairs.

## Main methods from the lecture
- [[ComputerVision101_Week1_NearestNeighborInterpolation]]
- [[ComputerVision101_Week1_LinearInterpolation]]
- [[ComputerVision101_Week1_BilinearInterpolation]]
