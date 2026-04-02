#university #computervision #week1 #theory

# Nyquist-Shannon Sampling Theorem

Sources:
- Week 1 lecture context: [[ComputerVision101_Week1_Sampling]]
- Wikipedia: https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem
- Claude Shannon, *Communication in the Presence of Noise*:
  - https://course.ccs.neu.edu/csg250/ShannonNoise.pdf

## Core idea
The theorem gives a condition under which a continuous signal can be reconstructed exactly from discrete samples.

It says that if a signal is band-limited, then sampling fast enough preserves all information needed for perfect reconstruction.

## Shannon's statement
Shannon's 1949 paper states, in substance:

- if a function contains no frequencies higher than `B` hertz
- then it is completely determined by samples spaced less than `1 / (2B)` seconds apart

Equivalently:

- the sampling rate must be greater than `2B` samples per second

This is the origin of the familiar rule:

$$
f_s > 2B
$$

where:

- `f_s` is the sampling frequency
- `B` is the highest frequency present in the signal

## Nyquist rate and Nyquist frequency

Two related quantities are easy to mix up:

- `Nyquist rate`: the minimum sampling rate needed for exact reconstruction, namely `2B`
- `Nyquist frequency`: half the sampling rate, namely `f_s / 2`

For perfect reconstruction of a band-limited signal, the signal bandwidth must fit below the Nyquist frequency:

$$
B < \frac{f_s}{2}
$$

## Why this matters
Sampling creates a discrete sequence from a continuous signal.

If the signal contains frequencies above half the sampling rate, those frequencies cannot be represented unambiguously after sampling. Different continuous signals can then produce the same sample sequence.

That ambiguity is called `aliasing`.

## Aliasing
Aliasing happens when:

$$
f_s \le 2B
$$

In frequency-domain language:

- sampling creates repeated copies of the spectrum
- if the sample rate is high enough, these copies stay separate
- if it is too low, the copies overlap
- once they overlap, the original signal is not recoverable in general

This is the key reason for anti-aliasing before sampling.

## Reconstruction formula
The ideal reconstruction formula is the Whittaker-Shannon interpolation formula:

$$
x(t) = \sum_{n=-\infty}^{\infty} x(nT)\,\mathrm{sinc}\!\left(\frac{t-nT}{T}\right)
$$

where:

- `T = 1 / f_s` is the sampling interval
- `x(nT)` are the samples

Interpretation:

- each sample becomes a shifted sinc function
- all those sinc functions are added together
- the original continuous signal is recovered exactly, in the ideal mathematical setting

## Why sinc appears
An ideal band-limit in frequency corresponds to a sinc-shaped kernel in the signal domain.

So ideal reconstruction is not nearest-neighbor or linear interpolation. Mathematically, it is sinc interpolation.

That is why nearest-neighbor and linear interpolation are practical approximations, not exact Nyquist-Shannon reconstruction rules.

## Connection to images
The theorem also applies to spatial sampling, not just time signals.

For images:

- the continuous scene or image is sampled on a pixel grid
- high spatial frequencies correspond to fine detail, sharp edges, or texture
- if the pixel grid is too coarse, those details alias into false lower-frequency patterns

In vision, this can look like:

- jagged edges
- moire patterns
- texture artifacts
- wrong apparent frequencies or orientations

## Intuition for computer vision
If image detail changes faster than the pixel grid can capture, the grid confuses that detail with something else.

So a camera should either:

- sample densely enough
- or blur / low-pass filter before sampling

That blur is the spatial analogue of an anti-aliasing filter.

## Important assumptions
The theorem is exact only under ideal assumptions:

- the signal is perfectly band-limited
- samples are exact
- infinitely many samples are available
- reconstruction uses ideal sinc interpolation

Real systems only approximate this setup.

So in practice:

- we prefilter
- we oversample when possible
- we use approximate interpolation methods

## Historical note
The standard modern name is `Nyquist-Shannon sampling theorem`, but the history is broader.

Wikipedia notes that:

- Harry Nyquist is associated with the sampling-rate idea
- Claude Shannon gave the famous communication-theory statement
- E. T. Whittaker had earlier mathematical versions of the interpolation result

So you may also see names like:

- `Whittaker-Shannon sampling theorem`
- `Whittaker-Nyquist-Shannon theorem`

## What to remember for this course

- sampling discretizes a continuous signal or image
- exact recovery requires a sufficiently high sample rate
- the safe threshold is tied to the highest frequency present
- undersampling causes aliasing
- ideal reconstruction uses sinc interpolation
- in images, anti-aliasing is about removing high spatial frequencies before sampling

## Related notes
- [[ComputerVision101_Week1_Sampling]]
- [[ComputerVision101_Week1_Discretization]]
- [[ComputerVision101_Week1_Interpolation]]
- [[ComputerVision101_Week1_Histograms]]
