const RentRequest = require('../models/rentRequest.model');
const OfficeSpace = require('../models/officeSpace.model');
const User = require('../models/user.model');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');
const SendEmail = require('../utils/email/sendEmail');

const add = async (req, res) => {
    // Fetching designated officeSpace for the id of the owner.
    const choosenOfficeSpace = await OfficeSpace.findById(req.body.officeSpaceId);
    req.body.officeSpaceOwnerId = choosenOfficeSpace.ownerId;

    // Creating the rent request
    const rentRequest = await RentRequest.create(req.body);

    // Finding the owner of the house
    const house = await OfficeSpace.findById(req.body.officeSpaceId);
    const owner = await User.findById(house.ownerId);    

    // Major email info
    let recipient = owner.email;
    let subject = `New Rent request from ${rentRequest.fullName}`; 
    let emailBody = {
        name: owner.fullName,
        requestSender: rentRequest.fullName,
        userId: owner._id,
        rentRequestId: rentRequest._id,
        user: owner.fullName.split(' ').join('')
    }  
    let template = "./template/newRentRequest.handlebars";

    // Sending the email to the house owner
    await SendEmail( recipient, subject, emailBody, template );

    res.status(StatusCodes.CREATED).json({ message: 'Rent request sent', rentRequest });
};

const getAll = async(req, res) => {
    const rentRequests = await RentRequest.find({})
    res.status(StatusCodes.OK).json({ rentRequests })
};

const findById = async(req, res) => {
    const rentRequestId = req.query.id;
    const rentRequest = await RentRequest.findById(rentRequestId);
    if (!rentRequest) {
        throw new BadRequestError(`Rent request not found!`);
    }
    res.status(StatusCodes.OK).json({ rentRequest });
};

const findByOfficeSpaceId = async(req, res) => {
    const officeSpaceId = req.query.officeSpaceId;
    const rentRequests = await RentRequest.find({ officeSpaceId: officeSpaceId });
    if (!rentRequests) {
        throw new BadRequestError(`Rent request not found for this owner.`);
    }
    res.status(StatusCodes.OK).json({ rentRequests });
};

const remove = async(req, res) => {
    const rentRequestId = req.query.id;
    const deletedRentRequest = await RentRequest.findByIdAndRemove({ _id: rentRequestId});

    if (!deletedRentRequest) {
        throw new NotFoundError(`Rent request with id ${rentRequestId} not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Rent request deleted'})
};

const edit = async(req, res) => {
    var status = req.body.status;

    // Change number of available slots in the office space

    // Change the status of the slot if the status of the request is approved

    // Send email regarding the rent request status
    
    const rentRequest = await RentRequest.findByIdAndUpdate({ _id: req.query.id }, req.body);
    const updatedRentRequest = await RentRequest.findById(rentRequest._id);

    if (!updatedRentRequest) {
        throw new NotFoundError(`Request not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Rent request updated', rentRequest: updatedRentRequest})
};

module.exports = { add, getAll, edit, findByOfficeSpaceId, findById, remove }