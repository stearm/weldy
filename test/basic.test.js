/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const weldy = require('../index')

const square = a => a * a
const sum = (a, b, c, d) => a + b + c + d
const sub = (a, b) => a - b

describe('basic.test', function () {
  it('should return the square of 4', function (done) {
    weldy(4, [
      [ square ]
    ]).then(function (result) {
      expect(result.value).to.equals(16)
      done()
    }).catch(function (err) {
      done(err)
    })
  })

  it('should sum 2,3,4,5 and subtract 4 to the result', function (done) {
    weldy(2, [
      [ sum, 3, 4, 5 ],
      [ sub, 4 ]
    ]).then(function (result) {
      expect(result.value).to.equals(10)
      done()
    }).catch(function (err) {
      done(err)
    })
  })
})
