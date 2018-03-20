const express = require('express')
const router = express.Router()
const admin = require('firebase-admin')

const dbURL = 'http://localhost:3000' // or database url
const serviceAccount = 'firebase-adminsdk.json' // get this file from firebase

// firebase initializeApp
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbURL
})

router.get('/:id', (req, res) => {
  let token = req.params.id
  admin.auth().verifyIdToken(token)
    .then(decodedToken => {
      console.log('you are logged in >>>', decodedToken)
      return {first_name, }
    })
    .catch(error => console.log('error', error))
})

module.exports = router
