const express = require('express');
const router = express.Router()

const apiAdapter = require('./helpers/apiAdapter')

const BASE_URL = process.env.PAYMENT_URL || 'http://localhost:5000'
const api = apiAdapter(BASE_URL)
const authorize = require('./auth/authorize')
const Role = require('./auth/role');


router.post('/payments/payment', authorize(), (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data)
    })
})

router.get('/payments/payment/:paymentId', authorize(Role.Admin), (req, res, next) => {
    api.get(req.path, { params: req.query }).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router