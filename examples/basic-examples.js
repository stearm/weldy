'use strict'

const weldy = require('./../index')

const sqrtGen = function* (a) { return new Promise((resolve, reject) => resolve(a * a)) }
const sumGen = function* (a, b, c, d) { return new Promise((resolve, reject) => resolve(a + b + c + d)) }
const subGen = function* (a, b) { return new Promise((resolve, reject) => resolve(a - b)) }

const sqrtProm = a => new Promise((resolve, reject) => resolve(a * a))
const sumProm = (a, b, c, d) => new Promise((resolve, reject) => resolve(a + b + c + d))
const subProm = (a, b) => new Promise((resolve, reject) => resolve(a - b))

const sqrt = a => a * a
const sum = (a, b, c, d) => a + b + c + d
const sub = (a, b) => a - b

weldy(null, [
  [ sqrtGen ],
  [ sumGen, 3, 4, 5 ],
  [ subGen, 4 ],
  [ console.log ]
])

weldy(5, [
  [ sqrtProm ],
  [ sumProm, 3, 4, 5 ],
  [ subProm, 4 ],
  [ console.log ]
])

weldy(5, [
  [ sqrt ],
  [ sum, 3, 4, 5 ],
  [ sub, 4 ] ]
).then(result => {
  console.log(result)
})
