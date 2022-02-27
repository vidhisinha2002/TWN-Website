const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

});

const Contactdb = mongoose.model('contactdb', schema);

module.exports = Contactdb;