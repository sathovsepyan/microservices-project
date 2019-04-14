const express = require('express');
const router = express.Router()

const apiAdapter = require('./helpers/apiAdapter')

const BASE_URL = process.env.BOOKING || 'http://localhost:3000'
const api = apiAdapter(BASE_URL)


router.get('/booking/available-slots', (req, res) => {

    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router