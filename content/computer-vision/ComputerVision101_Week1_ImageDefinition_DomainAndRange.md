#university #computervision #week1 #theory

# Image Definition, Domain, and Range

Source:
- HC1a Images and Interpolation
- https://rvdboomgaard.github.io/ComputerVision_LectureNotes/LectureNotes/IP/Images/index.html

![[ComputerVision101_Week1_Definition_Slide-13.png]]

## Main definition
The lecture defines an image as

$$
f: E \to V
$$

This means:
- $E$ is the **domain**
- $V$ is the **range**

At every position $x \in E$, the image gives a value $f(x) \in V$.

## Domain
The domain tells you **where** you are measuring.

For a flat image:

$$
E \subseteq \mathbb{R}^2
$$

So a point in the image is something like

$$
x = (x,y)
$$

This is just a position on the camera sensor or image plane.

The lecture notes also point out:
- for ordinary photographs, $E \subseteq \mathbb{R}^2$
- for scans / volumetric data, $E \subseteq \mathbb{R}^3$
- the coordinate frame can change while the underlying signal stays the same

## Range
The range tells you **what kind of value** is stored at each position.

Examples:

Grayscale:
$$
f(x) \in \mathbb{R}
$$

Color:
$$
f(x) = (r(x), g(x), b(x)) \in \mathbb{R}^3
$$

Binary image / mask:
$$
f(x) \in \{0,1\}
$$

Segmentation labels:
$$
f(x) \in \{0,1,2,\dots,K\}
$$

The handwritten notes phrase the binary case as:
- indicator image
- binary mask / segmentation

with an example such as:
- `0` = background
- `1` = person

and note that semantic segmentation just uses more labels.

## Easy way to remember it
- Domain = input = position
- Range = output = measured value

So:

$$
\text{position} \mapsto \text{brightness/color/label}
$$

## Why this matters
This is the foundation for the rest of the lecture:
- If the domain becomes discrete, that is **sampling**
- If the range becomes discrete, that is **quantization**

## Links
- [[ComputerVision101_Week1_WhatIsAnImage]]
- [[ComputerVision101_Week1_Sampling]]
- [[ComputerVision101_Week1_Quantization]]
