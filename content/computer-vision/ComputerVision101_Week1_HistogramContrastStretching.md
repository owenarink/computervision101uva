#university #computervision #week1 #theory

# Histogram Contrast Stretching

Source:
- [[CV101_LectureNotes1b]]

## Goal
Use the full luminance range when the original image occupies only a narrow interval.

## Formula

$$
g = \frac{f - f_{\min}}{f_{\max} - f_{\min}}
$$

## Meaning

- subtract the minimum value
- divide by the old value range
- map intensities to `[0,1]`

This increases contrast for low-contrast images.
