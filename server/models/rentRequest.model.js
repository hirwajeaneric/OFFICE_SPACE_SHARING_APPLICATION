const mongoose = require('mongoose');

const rentRequestSchema = new mongoose.Schema({
    officeSpaceId: { 
        type: String, 
        required: true 
    },
    slotId: { 
        type: String, 
        required: true 
    },
    officeSpaceOwnerId: { 
        type: String, 
        required: true 
    },
    requestingUserId: { 
        type: String, 
        required: true 
    },
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        trim: true, 
        required: [true, 'Email must be provided'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ]
    },
    phone: { 
        type: String, 
        required: true,
        maxlength: 12,
        minlength: 10,
    },
    activityType: { 
        type: String, 
        required: false 
    },
    activityDescription: { 
        type: String, 
        required: false 
    },
    comment: { 
        type: String, 
        required: false 
    },
    sendDate: { 
        type: Date, 
        required: true,
        default: new Date().toUTCString() 
    },
    status: { 
        type: String, 
        required: true,
        default: 'Pending',
        enum: {
            values: ['Pending', 'Accepted', 'Rejected'],
            message: '{VALUE} is not supported as a request status.',
        } 
    },
    response: { 
        type: String, 
        required: false 
    },
    responseDate: { 
        type: Date, 
        required: false 
    }
}) 

module.exports = mongoose.model('RentRequest', rentRequestSchema);