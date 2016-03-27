# itercol
A lazy, generator-based, JS library for handling sequences in a concise, efficient way.

## API
### class:Iterator(iterator)
Create a new instance of an Iterator by passing its constructor an iterator.

```js
const iter = new Iterator(new Set([1, 2, 3, 4]));
```

### Iterator::invoke(methodName, ...args)
Invoke a method of the wrapped iterator.

```js
const iter = new Iterator(new Set([1, 2, 3, 4]));
iter.invoke('add', 5);
```

### Iterator::filter(predicate)
Return a filtered iterator (lazy).

### Iterator::map(mapper)
Return a mapped iterator (lazy).

### Iterator::take(limit)
Return a limited iterator.

### Iterator::reduce(reducer, accumolator)
Reduce an iterator in O(n), instead of consuming it (O(n)) and then reducing the resulting array (O(n)).

## Usage
```js
'use strict';

const Iterator = require('itercol');
const iter = new Iterator(new Set([1, 2, 3, 4]));
for (let item of iter.filter(x => console.log(x) || x > 2).map(x => x * 2)) {
    console.log(item);
}
/* this will print :
1
2
3
6
4
8
*/

let arr = Array.from(iter); // easily consume the iterator :)
```