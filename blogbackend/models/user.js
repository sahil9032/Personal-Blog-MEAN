const { round } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    role: String
});

module.exports = mongoose.model('User', userSchema, 'Users')
