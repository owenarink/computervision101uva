#university #computervision #week1 #theory

# Domain Iterators

Source:
- [[CV101_LectureNotes1b]]

## Idea
A domain iterator enumerates pixel index tuples so you can visit every image location systematically.

Example pattern from the lecture:

```python
def domainIterator(size):
    for i in xrange(size[0]):
        for j in xrange(size[1]):
            yield (i, j)
```

## Why useful

- clean iteration over all pixels
- the same tuple indexing works for multidimensional arrays
- can be reused for sub-images

The main thing to watch is the index order.
