#university #computervision #week1 #theory

# Histogram Equalization

Source:
- [[CV101_LectureNotes1b]]

## Goal
Create a new image whose intensities are spread more evenly across the available range.

## Core mapping
The lecture uses the normalized cumulative histogram as a lookup table:

$$
\phi(u) = H_f^{\text{norm}}(u)
$$

Then each input value `u` is replaced by `\phi(u)`.

## Key idea

- compute histogram
- compute cumulative histogram
- normalize it
- use it as a lookup table for output intensities

This preserves intensity ordering while improving contrast.
