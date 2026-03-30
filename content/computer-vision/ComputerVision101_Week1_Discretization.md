#university #computervision #week1 #theory

# Discretization

Source:
- HC1a Images and Interpolation
- https://rvdboomgaard.github.io/ComputerVision_LectureNotes/LectureNotes/IP/Images/index.html

![[ComputerVision101_Week1_Sampling_Slide-22.png]]
![[ComputerVision101_Week1_Quantization_Slide-19.png]]

## Big picture
The lecture starts with a continuous image:

$$
f: \mathbb{R}^2 \to \mathbb{R}
$$

But computers cannot store infinitely many positions and infinitely precise values.

So we must make the image discrete in two ways:

1. Discretize the **domain**: sampling
2. Discretize the **range**: quantization

## One-sentence summary
Sampling answers:
"At which positions do we measure?"

Quantization answers:
"Which numbers are we allowed to store?"

## Mental model
Imagine a smooth brightness surface.

- Sampling puts a grid on top of it
- Quantization rounds the values so the computer can store them

Without these two steps, digital images would not exist.

## Formula view
Continuous image:

$$
f: \mathbb{R}^2 \to \mathbb{R}
$$

Discrete image:

$$
F: \mathbb{Z}^2 \to \mathbb{R}
$$

And in practice, the stored values are often also quantized to integers such as:

$$
F(i,j) \in \{0,1,\dots,255\}
$$

## Why interpolation appears after discretization
Once you only know the image values on a grid, you often still want the value in between grid points.

That is why interpolation comes next:

$$
\text{continuous} \to \text{discrete} \to \text{estimate continuous again}
$$

## Links
- [[ComputerVision101_Week1_Sampling]]
- [[ComputerVision101_Week1_Quantization]]
- [[ComputerVision101_Week1_Interpolation]]
