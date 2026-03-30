#university #computervision #week1 #theory

# What Is An Image

Source:
- HC1a Images and Interpolation
- https://rvdboomgaard.github.io/ComputerVision_LectureNotes/LectureNotes/IP/Images/index.html

![[ComputerVision101_Week1_WhatIsAnImage_Slide-12.png]]

## Short idea
In everyday language, an image looks like a collection of pixels.

In the lecture, the deeper idea is:

$$
\text{image} = \text{a function that gives a value at each position}
$$

So an image is not only a grid of squares on your screen. A grid of pixels is only the **stored discrete version**.

## Intuition
Think of a photograph as a sheet where every location has some amount of light.

- A camera measures light
- The measurement depends on position
- So we model the image as a function over space

For a grayscale image:

$$
f(x, y)
$$

tells you the brightness at position $(x,y)$.

## Why the lecture says computers see images differently
Humans think:
- picture
- scene
- object

Computers store:
- numbers
- arranged on a grid

So there are really two views:

1. The **continuous mathematical idea**
$$
f: \mathbb{R}^2 \to \mathbb{R}
$$

2. The **discrete stored image**
$$
F: \mathbb{Z}^2 \to \mathbb{R}
$$

The whole lecture is mostly about moving between these two views.

## Pixels
Pixels are called the "atoms" of an image because they are the smallest stored units in the digital image.

But a pixel is not a tiny real square in nature. It is just:
- one sample location
- with one stored value

That is why zooming in too much makes an image look blocky.

The handwritten lecture notes make this explicit:
- pixels are not true rectangular image elements in the physical world
- the rectangular grid is part of the **discrete representation**, not part of reality

## Links
- [[ComputerVision101_Week1_ImageDefinition_DomainAndRange]]
- [[ComputerVision101_Week1_Discretization]]
