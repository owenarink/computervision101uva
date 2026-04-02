#university #computervision #week1 #theory

# Histogram Thresholding

Source:
- [[CV101_LectureNotes1b]]

## Goal
Choose a threshold that separates foreground from background based on the histogram.

## Manual approach
Inspect the histogram and choose a threshold when the distribution is bimodal.

## IsoData idea
Define:

- `m_L(t)`: mean of values `<= t`
- `m_H(t)`: mean of values `> t`

Then update:

$$
t = \frac{m_L(t) + m_H(t)}{2}
$$

and iterate until the threshold stabilizes.
