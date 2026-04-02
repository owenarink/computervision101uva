#university #computervision #week1 #theory

# Cubic Interpolation

Source:
- [[CV101_LectureNotes1b]]

## Idea
Cubic interpolation fits a cubic polynomial between two neighboring samples.

For a segment `x \in [k, k+1]`, the lecture writes:

$$
\hat{f}(x) = a(x-k)^3 + b(x-k)^2 + c(x-k) + d
$$

The coefficients are solved from four nearby samples:

- `F(k-1)`
- `F(k)`
- `F(k+1)`
- `F(k+2)`

## Properties

- uses `4` samples
- continuous
- differentiable
- smoother than linear interpolation

## Warning from the lecture
Higher-order polynomials can fluctuate too much between sample points, so you should not automatically increase the order.
