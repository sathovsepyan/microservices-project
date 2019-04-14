'use strict';
const status = require('http-status')
const uuid = require('uuid/v1');

const authorize = require('./auth/authorize')
const Role = require('./auth/role');
const userService = require('./user.service');

module.exports = (app) => {

    app.post('/test', (req, res, next) => {
        console.log(req.body);
        res.status(status.OK).json({})
    });

    app.post('/authenticate', (req, res, next) => {
        console.log('public')
        console.log(req.body)
        userService.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({
                message: 'Username or password is incorrect'
            }))
            .catch(err => next(err));
    });

    app.get('/', authorize(Role.Admin), (req, res, next) => {
        console.log('authorized')

        // userService.getAll()
        //     .then(users => res.json(users))
        //     .catch(err => next(err));
    });


    app.get('/booking/available-services', (req, res, next) => {
        console.log("Called: ", req.path)
        //throw new Error("My Error thrown on purpose!");
        next()
    })

    app.get('/fee-calculation/fees', authorize(), (req, res, next) => {
        next()
    })

    app.get('/fee-calculation/fee', authorize(), (req, res, next) => {
        next()
    })
}