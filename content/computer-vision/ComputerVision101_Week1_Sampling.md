#university #computervision #week1 #theory

# Sampling

Source:
- HC1a Images and Interpolation
- https://rvdboomgaard.github.io/ComputerVision_LectureNotes/LectureNotes/IP/Images/index.html

![[ComputerVision101_Week1_Sampling_Slide-22.png]]

## What sampling means
Sampling means:

$$
\text{choose specific positions where we measure the image}
$$

The original image is modeled as continuous:

$$
f: \mathbb{R}^2 \to \mathbb{R}_+
$$

After sampling, we get a discrete image:

$$
F: \mathbb{Z}^2 \to \mathbb{R}_+
$$

## Lecture formula
The lecture writes this as:

$$
F(i,j) = f(i\Delta y, j\Delta x)
$$

where:
- $\Delta x$ is the horizontal sampling distance
- $\Delta y$ is the vertical sampling distance

Usually, we take:

$$
\Delta x = \Delta y = 1
$$

after choosing pixel coordinates.

## Easy intuition
Sampling is like placing graph paper over a smooth image and only reading the value at the grid points.

If the grid is:
- fine, you keep more detail
- coarse, you lose detail

## Why bigger spacing is risky
If the samples are too far apart, small image details can disappear or be misrepresented.

That is why the slides mention the image should be "well sampled".

## Finite-size sensors
Real cameras do not measure a perfect mathematical point.

A sensor element measures light over:
- a small area
- during a small time interval

So a pixel value is closer to an average measurement than an exact point value.

The Remarkable notes add an important tradeoff:
- larger sensing areas average more values together
- this removes fine / high-frequency detail
- the image looks blurrier

So sampling is not only about spacing between grid points, but also about the effective area of each sensing probe.

## Indexing convention
The handwritten notes also record the common image-index convention:
- origin at the top-left
- $i$ = row index
- $j$ = column index

## Small example
If you sample every other location in 1D:

$$
f(x) \to F(k) = f(2k)
$$

then you threw away half the positions immediately.

## Links
- [[ComputerVision101_Week1_Discretization]]
- [[ComputerVision101_Week1_Quantization]]
- [[ComputerVision101_Week1_NyquistShannonSamplingTheorem]]
