#university #computervision #week1 #theory

# Histograms

Source:
- [[CV101_LectureNotes1b]]

## Idea
A histogram summarizes an image by counting how many pixel values fall inside each value interval or bin.

For a grayscale image, this describes the distribution of luminance values.

## Univariate histogram
For bins with edges `e_i`, the lecture gives:

$$
h_f(i) = \sum_{x \in E} [e_i \le f(x) < e_{i+1}]
$$

So each bin count tells you how many pixels have values in that interval.

## Choosing bins
Main tradeoff from the lecture:

- too many bins: many empty bins, noisy high-frequency detail
- too few bins: the distribution is oversmoothed and important structure disappears

The slides mention Sturges' rule:

$$
k = \log_2(n) + 1
$$

where `k` is the number of bins and `n` is the number of pixels.

## Cumulative histogram
The cumulative histogram `H_f(u)` counts how many pixels satisfy:

$$
f(x) \le u
$$

This is the discrete analogue of a cumulative distribution function.

## Color histograms
For color images, the lecture discusses:

- three separate 1D histograms, one per channel
- one 3D histogram over the joint color values

The 3D histogram keeps channel correlations, which separate 1D histograms lose.

## Why histograms matter
They are useful for:

- summarizing image brightness distributions
- detecting low contrast
- thresholding
- contrast stretching
- histogram equalization
