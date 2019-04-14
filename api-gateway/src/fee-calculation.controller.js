const express = require('express');
const router = express.Router()

const apiAdapter = require('./helpers/apiAdapter')

const BASE_URL = process.env.FEE_CALC_URL || 'http://localhost:4000'
const api = apiAdapter(BASE_URL)


router.get('/fee-calculation/fee', (req, res) => {
    api.get(req.path, { params: req.query }).then(resp => {
        res.send(resp.data)
    })
})

router.get('/fee-calculation/fees', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router