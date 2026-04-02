#university #computervision #week1 #theory

# Image Arithmetic

Source:
- [[CV101_LectureNotes1b]]

## Idea
Image arithmetic applies standard arithmetic pointwise to images sampled on the same grid.

For two images:

$$
H(k) = F(k) + G(k)
$$

## Examples

- simple addition:

$$
h = f + g
$$

- weighted combination:

$$
h = \frac{f + 2g}{3}
$$

In NumPy, these operations are often lifted directly to arrays.
