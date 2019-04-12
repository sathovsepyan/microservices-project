const express = require('express');
const router = express.Router()

const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3000'
const api = apiAdapter(BASE_URL)


router.get('/booking/available-slots', (req, res) => {

    api.get(req.path).then(resp => {
        res.send(resp.data)
    })

    // res.send(req.path + " called")
})

module.exports = router