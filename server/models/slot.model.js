const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    spaceId: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    // number: {
    //     type: String,
    //     required: true,
    // },
    status: {
        type: String,
        required: true,
        default: 'available',
        enum: {
            values: ["available","booked","unavailable"],
            message: '{VALUE} is not supported as a office-space slot status.'
        }
    },
    dimensions: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    occupantId: {
        type: String,
        required: false,
    },
    occupantName: {
        type: String,
        required: false,
    },
    occupantPhone: {
        type: String,
        required: false,
    },
    occupiedOn: {
        type: String,
        required: false,
    },    
    pictures: [
        { 
            type: String, 
            required: false
        }
    ],
}) 

module.exports = mongoose.model('Slot', slotSchema);