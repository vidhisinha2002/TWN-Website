const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true,

    },
    date: {
        type: String,
        required: true
    },
    paragraph_1: {
        type: String,
        required: true

    },
    image: String,
    paragraph_2: String,
    paragraph_3: String

});

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;