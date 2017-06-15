import test from 'ava';
import iter from '.';

const counter = function* () {
  let c = 0;
  while (true) {
      yield c++;
  }
};

function* unique(iterable) {
    const values = new Set();
    for (const x of iterable) {
        if (!values.has(x)) {
            values.add(x);
            yield x;
        }
    }
}

test('iter.[iterator]', t => {
  const s = new Set([1, 2, 3, 4]);
  const it = iter(s);
  t.is(Array.from(it).length, 4);
});

test('iter.filter', t => {
  const s = new Set([1, 2, 3, 4]);
  const it = iter(s).filter(x => x % 2);
  t.is(Array.from(it).length, 2);
});

test('iter.map', t => {
  const s = new Set([1, 2, 3, 4]);
  const it = iter(s).map(x => x * 2);
  t.is(Array.from(it).reduce((y, x) => x + y, 0), 20);
});

test('iter.limit', t => {
  const it = iter(counter()).limit(6);
  t.is(Array.from(it).length, 6);
});

test('iter chaining', t => {
  const it = iter(counter()).map(x => x * 3).filter(x => x % 2 === 0).limit(3);
  const arr = Array.from(it);
  t.is(arr.length, 3);
  const [a, b, c] = arr;
  t.is(a, 0);
  t.is(b, 6);
  t.is(c, 12);
});

test('iter flatmap', t => {
    const it = iter([
        iter(counter()).map(x => x * 1).limit(3),
        iter(counter()).map(x => x * 2).limit(3),
        iter(counter()).map(x => x * 3).limit(3),
    ]).flatten();
    const arr = Array.from(it);
    t.deepEqual(arr, [0, 1, 2, 0, 2, 4, 0, 3, 6]);
});

test('iter extend', t => {
    iter.extend(unique);
    iter.extend('uniq', unique);
    let it = iter([
        iter(counter()).map(x => x * 1).limit(3),
        iter(counter()).map(x => x * 2).limit(3),
        iter(counter()).map(x => x * 3).limit(3),
    ]).flatten().unique();
    let arr = Array.from(it);
    t.deepEqual(arr, [0, 1, 2, 4, 3, 6]);
    it = iter([
        iter(counter()).map(x => x * 1).limit(3),
        iter(counter()).map(x => x * 2).limit(3),
        iter(counter()).map(x => x * 3).limit(3),
    ]).flatten().uniq();
    arr = Array.from(it);
    t.deepEqual(arr, [0, 1, 2, 4, 3, 6]);
});