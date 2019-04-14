const express = require('express');
const router = express.Router()

const apiAdapter = require('./helpers/apiAdapter')

const BASE_URL = process.env.BOOKING_URL || 'http://localhost:3000'
const api = apiAdapter(BASE_URL)
const authorize = require('./auth/authorize')
const Role = require('./auth/role');


router.get('/booking/slots', (req, res, next) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.post('/booking/slots/slot', authorize(Role.Admin), (req, res, next) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data)
    })
})

router.post('/booking/slots/:id/book', authorize(), (req, res, next) => {
    api.post(req.path, { params: req.query }).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router