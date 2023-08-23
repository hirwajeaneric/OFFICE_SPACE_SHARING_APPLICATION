const SlotModel = require('../models/slot.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors/index');
const multer= require('multer');
const officeSpaceModel = require('../models/officeSpace.model');

// Establishing a multer storage
const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => { callback(null, './spaces') },
    filename: (req, file, callback) => { callback(null, `space-${file.originalname}`) }
})



// Filter files with multer
const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback("Not an image! Please upload only images.", false);
    }
};



const upload = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter 
});



// Middleware for attaching files to the request body before saving.
const attachFile = async (req, res, next) => {
    var pics = [];
    const {query, body, files} = req;

    // Check if there is an slot already
    if (query.id) {
        const  existingSlot = await SlotModel.findById(query.id);
        
        if ( existingSlot &&  existingSlot.pictures.length !== 0) {
            pics =  existingSlot.pictures;
            if (files.length !== 0) {
                pics =  existingSlot.pictures;
                files.forEach(file => {
                    pics.push(file.filename); 
                });
            }
        } else if ( existingSlot &&  existingSlot.pictures.length === 0) {
            if (files.length !== 0) {
                pics =  existingSlot.pictures;
                files.forEach(file => {
                    pics.push(file.filename); 
                });
            }
        } else if (!existingSlot) {
            throw new BadRequestError(`Not found!`);
        }
    } else {
        if (files.length !== 0) {
            files.forEach(file => {
                pics.push(file.filename); 
            });       
        }
    }

    req.body.pictures = pics;
    next();
}



const add = async (req, res) => {
    console.log(req.body);
    const  slot = await SlotModel.create(req.body);

    // Get existing office space
    const existingOfficeSpace = await officeSpaceModel.findById(slot.spaceId);
    
    //Update office space number of slots and number of available slots
    const updatedOfficeSpace = await officeSpaceModel.findByIdAndUpdate(
        { _id: existingOfficeSpace._id } 
        , { 
            numberOfSlots: existingOfficeSpace.numberOfSlots+1,
            availableSlots: existingOfficeSpace.availableSlots+1 
        }
    );

    if (updatedOfficeSpace) {
        res.status(StatusCodes.CREATED).json({ message: 'Successfully added', slot });
    }
};



const getAll = async(req, res) => {
    const  slots = await SlotModel.find({})
    res.status(StatusCodes.OK).json({ slots })
};



const findById = async(req, res) => {
    const  slotId = req.query.id;
    console.log(slotId);
    const  slot = await SlotModel.findById(slotId);
    if(!slot){
        throw new BadRequestError(`Slot not found!`)
    }
    res.status(StatusCodes.OK).json({ slot })
};



const findBySpaceId = async(req, res) => {
    const spaceId = req.query.spaceId;
    const slots = await SlotModel.find({ spaceId: spaceId });
    res.status(StatusCodes.OK).json({ slots });
};



const findByOccupantId = async(req, res) => {
    const occupantId = req.query.occupantId;
    const slots = await SlotModel.find({ occupantId: occupantId });
    res.status(StatusCodes.OK).json({ slots });
};



const findByStatus = async(req, res) => {
    const status = req.query.status;
    const slots = await SlotModel.find({ status: status });
    res.status(StatusCodes.OK).json({ nbHits: slots.length, slots });
};



const edit = async(req, res) => {
    const  slot = req.body;
    const  slotId = req.query.id;
    
    const previousSlot = await SlotModel.findById(slotId);
    const updated = await SlotModel.findByIdAndUpdate({ _id:  slotId }, slot);
    const updatedSlot = await SlotModel.findById(updated._id);

    const existingOfficeSpace = await officeSpaceModel.findById(updatedSlot.spaceId);

    // Change the number of slot according to the update
    var slots = 0;
    if (previousSlot === 'available' && (updatedSlot.status === 'booked' || updatedSlot.status === 'unavailable')) {
        slots = existingOfficeSpace.availableSlots-1;
    } else if ((previousSlot === 'unavailable' || previousSlot === 'booked') && updatedSlot.status === 'available') {
        slots = existingOfficeSpace.availableSlots+1;
    }

    //Update office space number of slots and number of available slots
    const updatedOfficeSpace = await officeSpaceModel.findByIdAndUpdate(
        { 
            id: existingOfficeSpace._id 
        }, { 
            availableSlots: slots 
        }
    );

    if (updatedOfficeSpace) {
        res.status(StatusCodes.OK).json({ message: 'Updated', slot: updatedSlot });
    }
};



const remove = async(req, res) => {
    const slotId = req.query.id;
    const deletedSlot = await SlotModel.findByIdAndRemove({ _id: slotId});

    if (!deletedSlot) {
        throw new NotFoundError(`Slot with id ${slotId} not found!`);
    }

    // Get existing office space
    const existingOfficeSpace = await officeSpaceModel.findById(deletedSlot.spaceId);

    //Update office space number of slots and number of available slots
    const updatedOfficeSpace = await officeSpaceModel.findByIdAndUpdate(
        { 
            id: existingOfficeSpace._id 
        }, { 
            numberOfSlots: existingOfficeSpace.numberOfSlots-1,
            availableSlots: existingOfficeSpace.availableSlots-1 
        }
    );

    if (updatedOfficeSpace) {
        res.status(StatusCodes.OK).json({ message: 'Deleted'})
    }
};

module.exports = { add, getAll, findById, findByStatus, findByOccupantId, findBySpaceId, edit, upload, attachFile, remove }
