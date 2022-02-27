const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    city: String,
    state: String,
    address: String,
    bike_company: String,


});

const Customerdb = mongoose.model('Customerdb', schema);

module.exports = Customerdb;