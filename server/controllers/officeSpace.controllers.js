const OfficeSpaceModel = require('../models/officeSpace.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors/index');
const multer= require('multer');

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
    req.body.picture = req.file.filename;
    next();
}

const add = async (req, res) => {
    const  officeSpace = await OfficeSpaceModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Successfully added', officeSpace })
};

const getAll = async(req, res) => {
    const  officeSpaces = await OfficeSpaceModel.find({})
    res.status(StatusCodes.OK).json({ officeSpaces })
};

const findById = async(req, res) => {
    const  officeSpaceId = req.query.id;
    const  officeSpace = await OfficeSpaceModel.findById( officeSpaceId);
    if(!officeSpace){
        throw new BadRequestError(`OfficeSpace not found!`)
    }
    res.status(StatusCodes.OK).json({ officeSpace })
};

const findByOwnerId = async(req, res) => {
    const ownerId = req.query.ownerId;
    const officeSpaces = await OfficeSpaceModel.find({ ownerId: ownerId });
    res.status(StatusCodes.OK).json({ officeSpaces });
};

const findByLocation = async(req, res) => {
    const location = req.query.location;
    let  officeSpaces = [];
    const allProperties = await OfficeSpaceModel.find({});

    allProperties.forEach(officeSpace => {
        if ( officeSpace.location === location ||  officeSpace.location.includes(location)) {
            officeSpaces.push(officeSpace);
        }
    })

    res.status(StatusCodes.OK).json({ officeSpaces });
};

const findByMapCoordinates = async(req, res) => {
    const mapCoordinates = req.query.mapCoordinates;
    const officeSpaces = await OfficeSpaceModel.find({ mapCoordinates: mapCoordinates });
    res.status(StatusCodes.OK).json({ nbHits:  officeSpaces.length,  officeSpaces });
};

const findByStatus = async(req, res) => {
    const status = req.query.status;
    const officeSpaces = await OfficeSpaceModel.find({ status: status });
    res.status(StatusCodes.OK).json({ officeSpaces });
};

const edit = async(req, res) => {
    const  officeSpace = req.body;
    const  officeSpaceId = req.query.id;
    
    const updated = await OfficeSpaceModel.findByIdAndUpdate({ _id:  officeSpaceId }, officeSpace);
    const updatedOfficeSpace = await OfficeSpaceModel.findById(updated._id);

    res.status(StatusCodes.OK).json({ message: 'Updated', officeSpace: updatedOfficeSpace })
};

const remove = async(req, res) => {
    const officeSpaceId = req.query.id;
    const deletedOfficeSpace = await OfficeSpaceModel.findByIdAndRemove({ _id: officeSpaceId});

    if (!deletedOfficeSpace) {
        throw new NotFoundError(`OfficeSpace with id ${officeSpaceId} not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Deleted'})
};

module.exports = { add, getAll, findById, findByStatus, findByLocation, findByOwnerId, findByMapCoordinates, edit, upload, attachFile, remove }
