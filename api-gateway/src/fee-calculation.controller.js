const express = require('express');
const router = express.Router()

const apiAdapter = require('./helpers/apiAdapter')

const BASE_URL = process.env.FEE_CALC_URL || 'http://localhost:4000'
const api = apiAdapter(BASE_URL)
const authorize = require('./auth/authorize')
const Role = require('./auth/role');


router.get('/fee-calculation/fee', authorize(), (req, res) => {
    api.get(req.path, { params: req.query }).then(resp => {
        res.send(resp.data)
    })
})

router.get('/fee-calculation/fees', authorize(), (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router