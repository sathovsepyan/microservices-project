const express = require('express');
const router = express.Router()

const apiAdapter = require('./api-adapter')

const BASE_URL = 'http://localhost:5000'
const api = apiAdapter(BASE_URL)


router.post('/payments/payment', (req, res) => {

    api.get(req.path, req.body).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router