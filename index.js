'use strict'

const co = require('co')

function weldy (init, objects) {
  return co(function* () {
    let welding

    for (let i = 0; i < objects.length; i++) {
      const o = objects[ i ]

      const f = o[ 0 ]
      let args = o.slice(1)

      if (!f || typeof f !== 'function') {
        throw Error('You must pass a function.')
      }

      if (!args) {
        args = []
      }

      // encapsulate result to yieldable (object), require when call a function which returns a plain value
      if (i === 0) {
        welding = yield { value: f(init, ...args) }
      } else {
        welding = yield { value: f(welding.value, ...args) }
      }
    }
    return yield welding
  })
}

module.exports = weldy
