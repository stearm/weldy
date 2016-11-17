/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const weldy = require('./../index')

describe('errors.test', function () {
  it('should throw an error: nothing inside first element', function (done) {
    weldy(null, [
      []
    ])
      .then(() => {
        done(Error('should fail'))
      })
      .catch(err => {
        expect(err.message).to.equals('You must pass a function.')
        done()
      })
  })

  it('should throw an error: no function', function (done) {
    weldy(null, [
      [ { 'property': 'value' } ]
    ])
      .then(() => {
        done(Error('should fail'))
      })
      .catch(err => {
        expect(err.message).to.equals('You must pass a function.')
        done()
      })
  })
})
