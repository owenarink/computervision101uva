#university #computervision #lecture1b

Source:
![[ICV_2026_HC1b_histograms_PtOperators (1).pdf]]

**Computer Vision Lecture 1b**

This lecture continues the week 1 material with:

- interpolation recap
- 1D and 2D interpolation
- extrapolation
- image representation in NumPy/OpenCV
- domain iterators
- histograms
- point operators
- histogram-based contrast improvement

## Administrative note

- Lecturer shown on the slides: `Dimitris Tzionas`
- Contact shown on the slides:
  - `d.tzionas@uva.nl`
  - `e.a.veltmeijer@uva.nl`
- A note on the first slide says to `please CC your TA`

## Recap: storing continuous images

The lecture starts from the question:

- how can we store a continuous image?

Answer:

- discretize the spatial domain by `sampling`
- discretize the image range by `quantization`

Important implementation note from the slides:

- `2^8 = 256` values can be stored in `uint8`
- for processing, switch to `float`
- for storing or displaying, switch back to `uint8`
- watch out for `overflow`
- evaluation order matters

Example normalization formula from the slides:

$$
g = 255 \cdot \frac{f - f_{\min}}{f_{\max} - f_{\min}}
$$

OpenCV note:

- OpenCV uses `BGR`, not `RGB`

## Discretization and interpolation

Discrete pixels are samples of a continuous image:

$$
F(i,j) = f(i \Delta y, j \Delta x)
$$

with the slides using unit sample spacing for the simple case.

The interpolation problem is:

- start from discrete samples `F`
- infer a continuous approximation `\hat{f}`
- use `\hat{f}` to estimate values between sample points

## 1D interpolation

### Nearest neighbor

Idea:

- copy the nearest sample

Formula from the lecture:

$$
\hat{f}(x) = F(\lfloor x + 0.5 \rfloor)
$$

Properties:

- uses `1` nearby sample
- produces a `staircase` function
- defined everywhere
- not continuous
- not differentiable

### Linear interpolation

For `x \in [k, k+1]`, mix the left and right sample:

$$
\hat{f}(x) = (1 - (x-k))F(k) + (x-k)F(k+1)
$$

Interpretation:

- the coefficients are steering or mixing weights
- closer sample gets more weight

Properties:

- uses `2` samples
- piecewise linear
- continuous
- not differentiable at the sample locations

### Cubic interpolation

For the segment `x \in [k, k+1]`, the lecture uses a cubic polynomial:

$$
\hat{f}(x) = a(x-k)^3 + b(x-k)^2 + c(x-k) + d
$$

with constraints from four samples:

- `F(k-1)`
- `F(k)`
- `F(k+1)`
- `F(k+2)`

So cubic interpolation:

- uses `4` samples
- is smooth
- is continuous
- is differentiable

The lecture also warns that higher-order polynomials can overfit and fluctuate too much between sample points, so in practice you should prefer the smallest order that works well.

## Interpolation cheat sheet

### Nearest neighbor

- samples used: `1`
- shape: staircase
- continuous: no
- differentiable: no

### Linear

- samples used: `2`
- shape: piecewise linear
- continuous: yes
- differentiable: not at sample points

### Cubic

- samples used: `4`
- shape: smooth
- continuous: yes
- differentiable: yes

## 2D interpolation

### Bilinear interpolation

For a point:

$$
(x,y) = (i+a, j+b), \quad a,b \in [0,1]
$$

inside a grid cell, bilinear interpolation uses the four corner samples:

- `F(i,j)`
- `F(i+1,j)`
- `F(i,j+1)`
- `F(i+1,j+1)`

Formula from the lecture:

$$
\hat{f}(x,y) =
(1-a)(1-b)F(i,j)
+ a(1-b)F(i+1,j)
+ (1-a)bF(i,j+1)
+ abF(i+1,j+1)
$$

Interpretation:

- linear interpolation in `x`
- then linear interpolation in `y`

Generalization mentioned on the slides:

- nearest neighbor in `d` dimensions uses `1` sample
- bilinear in `2D` uses `2^2 = 4` samples
- trilinear in `3D` uses `2^3 = 8` samples
- bicubic in `2D` uses `4^2 = 16` samples

## Interpolation vs extrapolation

Interpolation:

- estimate values `inside` the image grid

Extrapolation:

- estimate values `outside` the image grid

Extrapolation strategies mentioned in the lecture:

- closest point
- mirror
- wrap / tiling

## Image representation in Python and OpenCV

The slides emphasize the NumPy/OpenCV indexing convention:

- `F[y, x]`
- equivalently `F[i, j]`

For color images:

- tensors have shape `H x W x 3`
- channels are stored as `BGR` in OpenCV
- an optional fourth channel can represent transparency

## Domain iterators

The lecture defines domain iterators as a way to visit every pixel index tuple.

Example from the slides:

```python
def domainIterator(size):
    for i in xrange(size[0]):
        for j in xrange(size[1]):
            yield (i, j)
```

And a pointwise negation example:

```python
def negateImage(image):
    result = empty(image.shape)
    for p in domainIterator(image.shape):
        result[p] = 1 - image[p]
    return result
```

Main idea:

- work with tuples like `(i, j)`
- use the same iterator pattern for whole images or sub-images

## Histograms

### Univariate histogram

A histogram summarizes an image by counting how many pixel values fall into each bin.

Notation from the lecture:

$$
h_f(i) = \sum_{x \in E} [e_i \le f(x) < e_{i+1}]
$$

Important points:

- choosing bin size is not trivial
- too many bins gives many empty bins and noisy detail
- too few bins loses distribution structure
- the slides mention `Sturges' rule`:

$$
k = \log_2(n) + 1
$$

where:

- `k` is the number of bins
- `n` is the number of pixels

### Histogram vs cumulative histogram

Histogram:

- counts frequencies per bin

Cumulative histogram:

- counts how many pixels have value less than or equal to a threshold

The cumulative version corresponds to a cumulative distribution function.

### Multivariate histogram

For color images, a single 1D histogram loses channel correlations.

Two options mentioned:

- three separate 1D histograms, one per channel
- one 3D histogram over the joint color space

The lecture recommends the 3D histogram as the better representation if you care about color correlations.

## Point operators

Point operators process each pixel independently, using only values from the same location.

General form from the lecture:

$$
g = \Psi f
$$

and for every location:

$$
g(x) = \psi(f(x))
$$

Examples from the slides:

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

- pointwise addition of two images:

$$
h = f + g
$$

## Image arithmetic

For two images on the same grid:

$$
H(k) = F(k) + G(k)
$$

The slides also give a weighted sum example:

$$
H = \frac{f + 2g}{3}
$$

## Alpha blending

Weighted average of two images:

$$
h_{\alpha} = (1-\alpha)f + \alpha g
$$

Meaning:

- `\alpha = 0` gives only `f`
- `\alpha = 1` gives only `g`
- intermediate values mix both

## Unsharp masking

If `g` is a blurred version of `f`, the lecture defines:

$$
h_{\beta} = f + \beta(f-g)
$$

Interpretation:

- `f-g` extracts detail
- adding it back sharpens the image

## Thresholding and binarization

Thresholding converts a grayscale image to a binary image:

$$
g = [f > \text{thresh}]
$$

So each pixel becomes:

- `1` if above threshold
- `0` otherwise

## Histogram issues

The lecture points out common contrast problems:

- image values only occupy a narrow middle range
- large bright values may be missing, making the image too dark
- low dark values may be missing, making the image too bright
- changing illumination can strongly change the histogram

## Histogram contrast stretching

Goal:

- use the full luminance range

Formula:

$$
g = \frac{f - f_{\min}}{f_{\max} - f_{\min}}
$$

Interpretation:

- subtract the minimum
- divide by the old range
- map the image to `[0,1]`

This improves contrast when the input occupies only a narrow luminance interval.

## Histogram equalization

Goal:

- transform the image so luminance values are distributed as evenly as possible

The lecture motivates this using the cumulative histogram:

$$
\phi(u) = H_f^{\text{norm}}(u)
$$

Then:

- visit each pixel in `f`
- read its luminance value `u`
- use `u` as a lookup key in the normalized cumulative histogram
- write the resulting value into the output image `g`

Core idea:

- cumulative histogram becomes a lookup table
- percentile ordering is preserved
- the output uses the available intensity range more effectively

## Histogram thresholding

The lecture gives a histogram-based segmentation idea:

- separate foreground from background using a threshold

Manual option:

- choose a threshold by looking at a bimodal histogram

Automatic option:

- `IsoData thresholding`

Definitions from the slides:

- `m_L(t)`: mean of values `<= t`
- `m_H(t)`: mean of values `> t`

Then update:

$$
t = \frac{m_L(t) + m_H(t)}{2}
$$

and iterate until convergence.

## Main takeaways

- interpolation reconstructs values between samples
- nearest, linear, and cubic interpolation trade off smoothness and sample use
- bilinear interpolation is the 2D extension of linear interpolation
- histograms summarize intensity distributions
- point operators transform pixel values independently
- histogram stretching and equalization improve contrast in different ways
- thresholding uses pixel values or histogram structure to segment an image

## Links

- [[ComputerVision101_Theory_Week1]]
- [[ComputerVision101_Week1_Histograms]]
- [[ComputerVision101_Week1_LocalOperators]]
- [[ComputerVision101_Week1_BilinearInterpolation]]
