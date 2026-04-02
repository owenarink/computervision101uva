#university #computervision #week1 #theory

# Alpha Blending

Source:
- [[CV101_LectureNotes1b]]

Alpha blending computes a weighted average of two images:

$$
h_\alpha = (1-\alpha)f + \alpha g
$$

Interpretation:

- `\alpha = 0` gives only `f`
- `\alpha = 1` gives only `g`
- values in between smoothly mix the two images
