# weldy

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/stearm/weldy.svg?branch=master)](https://travis-ci.org/stearm/weldy)

[![NPM](https://nodei.co/npm/weldy.png?compact=true)](https://nodei.co/npm/weldy/)

A sort of pipe operator (**[|>](http://elixir-lang.org/getting-started/enumerables-and-streams.html#the-pipe-operator)**) implementation for Node.js based on [co](https://github.com/tj/co).

weldy takes a value and an array with the following structure `[ [fn_1, ...args], [fn_2, ...args], ... ,[fn_n, ...args] ]`, processes each element invoking `fn`, using as first argument the output of the previous one (if it returns any value) and the `...args`. It returns a promise.
The first argument of the first function can be passed as the first `weldy` param.

## Examples

Simple arithmetical operations:

```javascript
weldy(5, [  // first argument for sqrt function
  [ square ],
  [ sum, 3, 4, 5 ],
  [ sub, 4 ],
  [ console.log ] // 33
])
```

CRUD operations on mongodb:

```javascript
function insert () {
    return db.collection('document').insertMany([
      { value: 'object1' },
      { value: 'object2' },
      { value: 'object3' }
    ])
}

function retrieve (value) {
  return db.collection('document').find({ value }).limit(1).next().then(object => object.value)
}

function update (value, newValue) {
  console.log(`Update collection: ${value} -> ${newValue}`)
  return db.collection('document').updateOne({ value }, { $set: { value: newValue } })
}

function isOk (object) {
  console.log(`Update ok: ${object.result.ok}`)
}

insert()

weldy('object1', [
  [ retrieve ],
  [ update, 'object0' ],
  [ isOk ]
])
```

Usage with node-fetch:

```javascript
weldy('http://github.com', [
  [ fetch ],
  [ res => res.text() ],
  [ console.log ]
])
```

## API
### weldy(value, [[ [fn_1, ...args], [fn_2, ...args], ... ,[fn_n, ...args]] ]).then( val => )
where `value` is the first argument of the first function (**// TODO**: to improve).

## License
MIT
