function* ifilter(iterable, predicate) {
  for (const x of iterable) {
    if (predicate(x)) yield x;
  }
}

function* imap(iterable, mapper) {
  for (const x of iterable) {
    yield mapper(x);
  }
}

function* ilimit(iterable, lmt) {
  let count = 0;
  for (const x of iterable) {
    if (count++ === lmt) return;
    yield x;
  }
}

function* ijoin(iterables) {
  for (const it of iterables) {
    yield* it;
  }
}

const iterPrototype = {
    filter(predicate) {
        return iter(ifilter(this._iterable, predicate));
    },

    map(mapper) {
        return iter(imap(this._iterable, mapper));
    },

    limit(lmt) {
        return iter(ilimit(this._iterable, lmt));
    },

    [Symbol.iterator]() {
        return this._iterable[Symbol.iterator]();
    },

    flatten() {
        return iter(ijoin(this._iterable));
    },
};

function iter(iterable) {
    const _iter = Object.create(iterPrototype);
    _iter._iterable = iterable;
    return _iter;
}

iter.extend = (name, extension) => {
    if (!extension) {
        extension = name;
        name = extension.name;
    }
    Object.assign(iterPrototype, {
        [name](...args) {
            return iter(extension(this._iterable, ...args));
        }
    });
};

module.exports = iter;