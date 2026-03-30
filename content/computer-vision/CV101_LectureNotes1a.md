#university #computervision #lecture1a

Source:
![[CV101_Lecture1a.pdf]]

**Computer Vision Lecture 1a**

**Administrative notes from the handwritten source**

- Research area of the lecturer: handwriting looks like `3D Human estimation`
- Lecturer: Dimitris Tzionas
- Lecturer email noted in the source: `d.tzionas@uva.nl`
- Extra email in the source: `e.a.veltmeijer@uva.nl` with note `tagged person-1`
- TA: Pieter J. Adema
- TA email noted in the source: `p.j.adema@uva.nl`
- A line in the notes says attendance is `at least 20% mandatory for grading`
- WC:
  - practice / discussion
  - work on a paper soon

- Deadline note in the source:
  - Wednesday `01/04/2026 23:59`
  - form groups
  - handwritten comment says `probably with Thomas`

- Also written in the source:
  - add team's name to TA
  - answers must be separate per question
  - ideally in LaTeX

- Lab 1 written in the source:
  - interpolation and histograms
  - problems:
    - `1a, 1b, 1c, 1d, 1e`
    - `2`
    - `3a, 3b, 3c, 3d`
    - `4a, 4b`

- Submission deadline note in the source:
  - for both coding and theory assignments: Sunday `23:59`

- Exam note in the source:
  - handwriting suggests a mock exam will be released
  - one line says the mock exam is released in two parts
  - part 1: before lecture, last week
  - part 2: last week
  - this part of the handwriting is not fully clear, so keep it as a rough note only

- HC Wooclaps:
  - bonus of `0.5`

**Images and interpolation**

Concepts listed in the source:

- functions
- continuous / discrete space
- sampling grid
- quantization
- interpolation
- histograms

**Pixels**

- Pixels are the "atoms" of an image
- Pixels are not real physical rectangular elements
- In grayscale, each pixel stores one luminance value
- The notes explicitly connect this with the effect:
  - from image to puzzle

There is also a small schema:

physical observation

$$
\downarrow
$$

mathematical model

$$
\downarrow
$$

image

**Light measurement**

The source says:

- light hits objects and bounces to the observer
- measure electromagnetic energy at every point of:
  - the eye's retina
  - the camera sensor

Camera is noted as something discussed in week 5.

Mathematical model:

- function over a spatial domain
- position on sensor

Sensor as 2D plane:

$$
E \subseteq \mathbb{R}^2
$$

points on the plane:

$$
x \in E
$$

image:

$$
f(x)
$$

The value $f(x)$ is proportional to measured energy at position $x$.

The notes say the image is defined over a continuous spatial domain.

**Measuring light in practice**

Question in the notes:

- how to measure light over a continuous domain?

Theory:

- infinitely many points:

$$
x \in E
$$

Practice:

- sampling probes are finite in:
  - number of sample locations
  - size / sampling area
  - temporal sensing

Integrate sensed energy:

- over finite area
- for finite time

The notes emphasize choosing:

- sampling grid distance
- probe area size

Tradeoff written in the source:

- if the area size is much greater, you average everything that falls in the small area
- for bigger areas, many details inside the sampling probe are averaged
- this means losing information
- the image looks more blurry
- you lose high-frequency details

But with smaller sensing probes:

- you preserve detail better
- less averaging blur

**Continuous image versus discrete image**

The underlying mathematical model of one part of an image would be a continuous function where height corresponds to luminance.

The handwritten notes say:

- the image plot and the image encode the same information
- what the computer processes as an image is called a discrete representation

**Definition**

Image $f$ maps from a spatial domain $E$ to a range $V$:

$$
f : E \to V
$$

from element:

$$
x \in E
$$

to value:

$$
f(x) \in V
$$

Euclidean space note:

$$
E \subseteq \mathbb{R}^n
$$

Examples from the notes:

- for 2D photos:

$$
E \subseteq \mathbb{R}^2
$$

- for a scan:

$$
E \subseteq \mathbb{R}^3
$$

**Coordinate frame / basis**

For:

$$
E \subseteq \mathbb{R}^2
$$

the basis can be arbitrary.

The coordinate frame can change, but the signal stays the same.

**Range**

At each element $x \in E$ we measure something from the range $V$.

Examples in the notes:

Grayscale:

$$
f(x) \in \mathbb{R}
$$

Color:

$$
f(x) =
\begin{bmatrix}
b(x) \\
g(x) \\
r(x)
\end{bmatrix}
\in \mathbb{R}^3
$$

The handwritten order is not completely consistent with the formal slides, but it clearly means the three color channels.

Indicator images:

- binary mask / segmentation

$$
f(x) \in \{0,1\}
$$

with example labels:

- `0 -> background`
- `1 -> person`

More labels:

- semantic segmentation

**Discretization**

Question:

- how can we store a continuous grayscale image?

The notes write:

$$
f : \mathbb{R}^2 \to \mathbb{R}^1
$$

with grayscale values.

To discretize:

- spatial domain $\to$ sampling
- image range $\to$ quantization

**Quantize range**

Per pixel:

- `1 byte`
- `8 bit`
- `uint8`

Usual value range:

$$
0 \ldots 255
$$

So:

$$
2^8 = 256
$$

possible values can be stored.

If values are:

- $>255$
- $<0$

they cannot be encoded correctly.

The notes explicitly mention:

- bit overflow
- values below zero also cannot be represented in `uint8`

For color:

- `3 byte / 24 bit`
- `8 bit -> red`
- `8 bit -> green`
- `8 bit -> blue`

The notes add:

- order can switch
- for OpenCV:

```python
BGR
```

- color images are stored as:

```python
height x width x 3
```

The note says "design is width x 3", but the intended tensor interpretation is clearly the color-channel dimension.

**Processing advice**

For all processing:

- stick to float
- quantize to `uint8` only at the end to visualize

Reason from the notes:

- float allows many intermediate values during computations
- but if you keep everything as `uint8`, values can overflow or clip
- that is why you convert back only at the end

**Normalization formulas**

The notes give:

```python
g = (f - f.min()) / (f.max() - f.min()) * 255
h = 255 * (f - f.min()) / (f.max() - f.min())
```

They say $g$ and $h$ look the same mathematically, but with code the order matters because execution is left to right.

The notes annotate it as:

- with $g$: first normalize, then multiply
- with $h$: first multiply, then normalize

Mathematically:

$$
g = \frac{f - f_{\min}}{f_{\max} - f_{\min}} \cdot 255
$$

$$
h = 255 \cdot \frac{f - f_{\min}}{f_{\max} - f_{\min}}
$$

The source says the problem is that intermediate values can still be unsigned integers like `uint8`, so we can get big values that cannot be represented in one byte.

Explicit numerical example from the handwritten notes:

- $f = 50$
- $f_{\min} = 20$
- $f_{\max} = 200$

Then:

$$
255 \cdot (f - f_{\min}) = 255 \cdot 30 = 7650
$$

and the notes say Python would give `226` because one byte cannot encode numbers larger than `255`.

So:

$$
\text{overflow}
$$

**Sample the domain**

Image pixels apply a rectangular sampling grid over a continuous function $f$.

Continuous image:

$$
f : \mathbb{R}^2 \to \mathbb{R}_+
$$

Discrete image:

$$
F : \mathbb{Z}^2 \to \mathbb{R}
$$

with:

$$
F(i,j) = f(i\Delta y, j\Delta x)
$$

and:

$$
i,j \in \mathbb{Z}
$$

Usually:

$$
\Delta y = \Delta x = 1
$$

Indexing notes from the source:

- origin is the top-left
- $i$ is row
- $j$ is column

There is also a note:

- if you sense a bigger area, this connects to week 3 local operators

**From discretization to interpolation**

The source says:

- discretization asks how to go from a real continuous image to a discrete image
- interpolation goes from discrete back to continuous

Interpolation note:

- from discrete to continuous
- this means loss of information already happened during sampling
- what we have left is enough for an informed guess

Given samples $F$ of a continuous $f$:

$$
\text{interpolation} \to \text{calculate } f(x,y) \text{ between sample values } F(i,j)
$$

Assumption:

- well-sampled image

Information theory note in the source:

- Nyquist-Shannon sampling theorem

**1D interpolation goal**

The handwritten note uses:

$$
F(x), \quad x \in \mathbb{Z}
$$

for input samples of $f$.

Continuous target:

$$
f(x) = \sin(x), \quad x \in \mathbb{R}
$$

Goal:

- guesstimate a function

$$
\hat{f}
$$

that approximates $f$ using only the discrete samples $F$.

**Nearest-neighbor interpolation**

Rule in the handwritten notes:

$$
\hat{f}(x) = F(\lfloor x + 0.5 \rfloor)
$$

Interpretation:

- copy nearest input sample
- use a floor function after adding `0.5`
- equivalent to rounding

The notes explicitly write:

- `round(x)`
- `floor(x)` means largest integer less than or equal to $x$

Examples copied from the handwritten pages:

$$
\hat{f}(0.1) = F(\lfloor 0.1 + 0.5 \rfloor) = F(\lfloor 0.6 \rfloor) = F(0)
$$

$$
\hat{f}(0.5) = F(\lfloor 0.5 + 0.5 \rfloor) = F(\lfloor 1.0 \rfloor) = F(1)
$$

$$
\hat{f}(1.2) = F(\lfloor 1.2 + 0.5 \rfloor) = F(\lfloor 1.7 \rfloor) = F(1)
$$

$$
\hat{f}(3.7) = F(\lfloor 3.7 + 0.5 \rfloor) = F(\lfloor 4.2 \rfloor) = F(4)
$$

This explains the staircase effect:

- many nearby $x$ values map to the same stored sample
- so the estimated function is piecewise constant

**What is still not written out in the source**

The handwritten note file stops after nearest-neighbor examples.

The source pages do **not** continue with a full handwritten derivation of:

- linear interpolation
- bilinear interpolation

So this digitized file includes everything visible in the source PDF, but not extra derivations that are only present in the slide deck.
