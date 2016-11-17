'use strict'

const fetch = require('node-fetch')
const weldy = require('./../index')

weldy('http://github.com', [
  [ fetch ],
  [ res => res.text() ],
  [ console.log ]
])
