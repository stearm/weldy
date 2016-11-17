'use strict'

const MongoClient = require('mongodb').MongoClient
const weldy = require('../index')

MongoClient.connect('mongodb://localhost:27017/weldy_example', function (err, db) {
  if (err) {
    throw err
  }

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
  ]).then(() => {
    db.dropDatabase().then(() => db.close())
  })
})
