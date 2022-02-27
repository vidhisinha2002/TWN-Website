const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    vendor_name: {
        type: String,
        required: true
    },

    service: String,
    service1: String,
    service2: String,
    service3: String,
    service4: String,
    service5: String,
    service6: String,

    address: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true

    },
    benificiary_name: {
        type: String,
        required: true
    },
    bank_address: {
        type: String,
        required: true
    },
    bank_acc: {
        type: String,
        required: true
    },
    acc_type: {
        type: String,
        required: true
    },
    ifsc_code: {
        type: String,
        required: true
    },
    image_aadhar: {
        type: Array,
        default: [],
    },
    image_driving: {
        type: Array,
        default: [],
    },
    image_technician: {
        type: Array,
        default: [],
    },
    image_garage: {
        type: Array,
        default: [],
    },
    image_electricity_bill: String,
    image_agreement: String,
});

const serviceproviderdb = mongoose.model('serviceproviderdb', schema);

module.exports = serviceproviderdb;