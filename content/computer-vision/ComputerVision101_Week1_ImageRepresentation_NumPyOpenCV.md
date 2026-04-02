#university #computervision #week1 #theory

# Image Representation in NumPy and OpenCV

Source:
- [[CV101_LectureNotes1b]]

## Indexing
The lecture uses:

- `F[y, x]`
- equivalently `F[i, j]`

So the first index is the row and the second is the column.

## Color images

- shape is typically `H x W x 3`
- OpenCV stores channels as `BGR`
- a fourth channel can store transparency

This matters because it is easy to accidentally assume `RGB` or swap `x` and `y`.
