'use strict';
const status = require('http-status')
const uuid = require('uuid/v1');

const authorize = require('./auth/authorize')
const Role = require('./auth/role');
const userService = require('./user.service');

module.exports = (app) => {
    app.post('/authenticate', (req, res, next) => {
        userService.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({
                message: 'Username or password is incorrect'
            }))
            .catch(err => next(err));
    });
}