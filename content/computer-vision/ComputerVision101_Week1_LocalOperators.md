#university #computervision #week1 #theory

# Local Operators

Source:
- [[CV101_LectureNotes1b]]

## Idea
Local or point operators process an image pixel by pixel.

At each location, the output value depends on the input value at the same location.

General form:

$$
g = \Psi f
$$

and pointwise:

$$
g(x) = \psi(f(x))
$$

## Typical examples

- negation:

$$
g(x) = 1 - f(x)
$$

- add a scalar:

$$
g = f + 1
$$

- logarithmic transform:

$$
g = \log(1 + f)
$$

- thresholding:

$$
g = [f > \text{thresh}]
$$

## Important idea
These operators change values, not pixel coordinates.

So they are different from geometric operations like interpolation or warping.

## Related notes
- [[ComputerVision101_Week1_ImageArithmetic]]
- [[ComputerVision101_Week1_AlphaBlending]]
- [[ComputerVision101_Week1_UnsharpMasking]]
- [[ComputerVision101_Week1_Thresholding]]
