const express = require('express');
const router = express.Router()

const apiAdapter = require('./helpers/apiAdapter')

const BASE_URL = process.env.PAYMENT_URL || 'http://localhost:5000'
const api = apiAdapter(BASE_URL)


router.post('/payments/payment', (req, res) => {

    api.get(req.path, req.body).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router