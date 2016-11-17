/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const weldy = require('../index')

const sqrt = a => new Promise((resolve, reject) => resolve(a * a))
const sum = (a, b, c, d) => new Promise((resolve, reject) => resolve(a + b + c + d))
const sub = (a, b) => new Promise((resolve, reject) => resolve(a - b))

describe('promise.test', () => {
  it('should return the sqrt of 4', done => {
    weldy(4, [
      [ sqrt ]
    ]).then(result => {
      expect(result.value).to.equals(16)
      done()
    }).catch(err => done(err))
  })

  it('should sum 2,3,4,5 and subtract 4 to the result', done => {
    weldy(2, [
      [ sum, 3, 4, 5 ],
      [ sub, 4 ]
    ]).then(result => {
      expect(result.value).to.equals(10)
      done()
    }).catch(err => done(err))
  })
})
