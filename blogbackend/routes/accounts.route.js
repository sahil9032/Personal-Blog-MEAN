const express = require('express');
const accountRoute = express.Router();

let User = require('../models/user');

//POST: localhost:4000/account/login
accountRoute.route('/login').post((req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            if (!data) {
                return res.json({
                    _id: '-1'
                })
            }
            return res.json({
                _id: data._id,
                email: data.email,
                name: data.name,
                role: data.role
            })
        }
    })
});

//POST: localhost:4000/account/create
accountRoute.route('/create').post((req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role
    }, (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            res.json(data)
        }
    })
});

//DELETE: localhost:4000/account/delete/:id
accountRoute.route('/delete/:id').delete((req, res) => {
    User.findOneAndRemove({_id: req.params.id},
        (error, data) => {
            if (error) {
                return res.json({
                    _id: '-1'
                })
            } else {
                res.status(200).json({
                    _id: req.params.id
                })
            }
        })
})

//PUT: localhost:4000/account/update/:id
accountRoute.route('/update/:id').put((req, res) => {
    User.findOneAndUpdate(req.params.id, req.body, (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            return res.status(200).json({
                _id: req.params.id
            })
        }
    })
})

module.exports = accountRoute;
