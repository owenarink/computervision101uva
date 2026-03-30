#university #computervision #week1 #theory

# Quantization

Source:
- HC1a Images and Interpolation
- https://rvdboomgaard.github.io/ComputerVision_LectureNotes/LectureNotes/IP/Images/index.html

![[ComputerVision101_Week1_Quantization_Slide-19.png]]

## What quantization means
Quantization means:

$$
\text{replace many possible values by a limited set of storable values}
$$

The image intensity might be any real number in theory, but the computer stores only a finite set.

## Standard grayscale case
For an 8-bit grayscale image:

$$
F(i,j) \in \{0,1,2,\dots,255\}
$$

That is:

$$
2^8 = 256
$$

possible values.

## Standard color case
For RGB:

$$
(R,G,B)
$$

with 8 bits per channel, so:
- 1 byte for red
- 1 byte for green
- 1 byte for blue

Total:

$$
24 \text{ bits per pixel}
$$

The handwritten notes also mention that channel order depends on the framework.

For example, OpenCV often uses:

```python
BGR
```

instead of `RGB`.

## Why the lecture says "use float while processing"
During computations, values can go outside the display range:

- smaller than $0$
- bigger than $255$

If you keep them as `uint8`, bad things can happen:
- clipping
- overflow
- loss of information

So the lecture advice is:

1. process in `float`
2. convert to `uint8` only when visualizing

## Rescaling formula
If you want to map values in an array $f$ to the display range $[0,255]$:

$$
g = \frac{f - f_{\min}}{f_{\max} - f_{\min}} \cdot 255
$$

This stretches the minimum to $0$ and the maximum to $255$.

## Python
```python
import numpy as np

f = np.array([20, 50, 120, 200], dtype=float)

g = (f - f.min()) / (f.max() - f.min()) * 255
g_uint8 = g.astype(np.uint8)

print(g)
print(g_uint8)
```

## Why order matters
The lecture warns that

```python
h = 255 * (f - f.min()) / (f.max() - f.min())
```

can be dangerous if `f` is still `uint8`.

Reason:
- `255 * (...)` may happen while values are still stored in 8 bits
- numbers above 255 can overflow

So the safe idea is:
- convert to float first
- then scale

The handwritten notes explain the subtle point here:
- the formulas are mathematically equivalent
- but code runs left to right
- if multiplication happens while values are still `uint8`, intermediate overflow can happen before normalization finishes

## Easy intuition
Quantization is just rounding the vertical axis of the image values.

Sampling discretizes **where** you look.
Quantization discretizes **what values** you can store.

## Links
- [[ComputerVision101_Week1_Discretization]]
- [[ComputerVision101_Week1_Sampling]]
