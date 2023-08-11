const mongoose = require('mongoose');

const officeSpaceSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: [true, 'Description must be provided'] 
    },
    officeSpaceType: { 
        type: String,
        required: false, 
        enum: {
            values: [
                'Private Office',
                'Shared Office',
                'Open Office',
                'Co-working Space',
                'Meeting Room',
                'Conference Room',
                'Boardroom',
                'Virtual Office',
                'Hot Desk',
                'Executive Suite',
                'Training Room',
                'Lounge Area',
                'Cafeteria',
                'Business Center',
                'Incubator Space',
                'Flex Space',
                'Startup Hub',
                'Food Store',
                'Electronic Hardware Store',
                'Shop',
                'Warehouse',
                'Multi-purpose store',
                'Classroom complex'
              ],
            message: '{VALUE} is not supported as a office space type.'
        }
    },
    numberOfSlots: {
        type: Number,
        required: true,
    },
    availableSlots: { 
        type: Number, 
        required: false, 
    },
    ownerId: { 
        type: String, 
        required: true 
    },
    ownerName: { 
        type: String, 
        required: true 
    },
    ownerPhone: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: [true, 'Location must be provided']
    },
    mapCoordinates: { 
        type: String, 
        required: true, 
    },
    picture: { 
        type: String, 
        required: false
    },
    lastUpdated: { 
        type: Date, 
        required: true,
        default: Date.now() 
    }
}) 

module.exports = mongoose.model('OfficeSpace', officeSpaceSchema);