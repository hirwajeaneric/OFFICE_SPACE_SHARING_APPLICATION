const OfficeSpaceModel = require('../models/officeSpace');
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
    var pics = [];
    const {query, body, files} = req;

    // Check if there is an officeSpace already
    if (query.id) {
        const  existingOfficeSpace = await OfficeSpaceModel.findById(query.id);
        
        if ( existingOfficeSpace &&  existingOfficeSpace.pictures.length !== 0) {
            pics =  existingOfficeSpace.pictures;
            if (files.length !== 0) {
                pics =  existingOfficeSpace.pictures;
                files.forEach(file => {
                    pics.push(file.filename); 
                });
            }
        } else if ( existingOfficeSpace &&  existingOfficeSpace.pictures.length === 0) {
            if (files.length !== 0) {
                pics =  existingOfficeSpace.pictures;
                files.forEach(file => {
                    pics.push(file.filename); 
                });
            }
        } else if (!existingOfficeSpace) {
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
    const data = req.body;
    const  officeSpace = await OfficeSpaceModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Successfully added', officeSpace })
};

const getAll = async(req, res) => {
    const  officeSpaces = await OfficeSpaceModel.find({})
    res.status(StatusCodes.OK).json({ nbHits:  officeSpaces.length,  officeSpaces })
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
    res.status(StatusCodes.OK).json({ nbHits:  officeSpaces.length,  officeSpaces });
};

const findByLocation = async(req, res) => {
    const location = req.query.location;
    let  officeSpaces = [];
    const allOfficeSpaces = await OfficeSpaceModel.find({});

    allOfficeSpaces.forEach(officeSpace => {
        if ( officeSpace.location === location ||  officeSpace.location.includes(location)) {
            officeSpaces.push(officeSpace);
        }
    })

    res.status(StatusCodes.OK).json({ nbHits: officeSpaces.length, officeSpaces });
};

const findByMapCoordinates = async(req, res) => {
    const mapCoordinates = req.query.mapCoordinates;
    const officeSpaces = await OfficeSpaceModel.find({ mapCoordinates: mapCoordinates });
    res.status(StatusCodes.OK).json({ nbHits:  officeSpaces.length,  officeSpaces });
};

const findByStatus = async(req, res) => {
    const status = req.query.status;
    const officeSpaces = await OfficeSpaceModel.find({ status: status });
    res.status(StatusCodes.OK).json({ nbHits: officeSpaces.length, officeSpaces });
};

const findByPostId = async(req, res) => {
    const postId = req.query.postId;
    const  officeSpaces = await OfficeSpaceModel.find({ postId: postId });
    res.status(StatusCodes.OK).json({ nbHits:  officeSpaces.length,  officeSpaces });
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

module.exports = { add, getAll, findById, findByStatus, findByLocation, findByOwnerId, findByMapCoordinates, findByPostId, edit, upload, attachFile, remove }
