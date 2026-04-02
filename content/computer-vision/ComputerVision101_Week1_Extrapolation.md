#university #computervision #week1 #theory

# Extrapolation

Source:
- [[CV101_LectureNotes1b]]

## Idea
Extrapolation estimates image values outside the sampled image grid.

This is different from interpolation, which estimates values inside the grid.

## Strategies mentioned in the lecture

- closest-point copying
- mirror padding
- wrap / tiling

These rules are useful at image borders when an algorithm needs values outside the domain.
