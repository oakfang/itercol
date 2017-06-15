# itercol
A lazy, generator-based, JS library for handling sequences in a concise, efficient way.

## API
### iter(iterator)
Create a new `iter` by passing its constructor an iterator.

```js
const it = iter(new Set([1, 2, 3, 4]));
```

### iter::filter(predicate)
Return a filtered iter (lazy).

### iter::map(mapper)
Return a mapped iter (lazy).

### iter::limit(limit)
Return a limited iter.

### iter::flatten()
Flatten any inner iterable of iterables.

## Usage
```js
const it = iter([
    iter(counter()).map(x => x * 1).limit(3),
    iter(counter()).map(x => x * 2).limit(3),
    iter(counter()).map(x => x * 3).limit(3),
]).flatten();
const arr = Array.from(it);
t.deepEqual(arr, [0, 1, 2, 0, 2, 4, 0, 3, 6]);
```