const RentRequest = require('../models/rentRequest.model');
const OfficeSpace = require('../models/officeSpace.model');
const User = require('../models/user.model');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');
const SendEmail = require('../utils/email/sendEmail');
const officeSpaceModel = require('../models/officeSpace.model');
const slotModel = require('../models/slot.model');
const sendEmail = require('../utils/email/sendEmail');



const add = async (req, res) => {
    // Fetching designated officeSpace for the id of the owner.
    const choosenOfficeSpace = await OfficeSpace.findById(req.body.officeSpaceId);
    req.body.officeSpaceOwnerId = choosenOfficeSpace.ownerId;

    // Creating the rent request
    const rentRequest = await RentRequest.create(req.body);

    // Finding the owner of the house
    const officeSpace = await OfficeSpace.findById(req.body.officeSpaceId);
    const owner = await User.findById(officeSpace.ownerId);    

    // Major email info
    let recipient = owner.email;
    let subject = `New Rent request from ${rentRequest.fullName}`; 
    let text = `Hello ${owner.fullName}, \n\nYou have a new rent request from ${rentRequest.fullName}. \n\nClick on the link bellow and view more details: \n ${process.env.CLIENT_ADDRESS}myaccount/rent-requests \n\nBest regards, \nOSSA`

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
    const rentRequest = await RentRequest.findByIdAndUpdate({ _id: req.query.id }, req.body);
    const updatedRentRequest = await RentRequest.findById(rentRequest._id);

    if (!updatedRentRequest) {
        throw new NotFoundError(`Request not found!`);
    }

    const existingOfficeSpace = await officeSpaceModel.findById(slot.spaceId);

    var updatedOfficeSpace = {};
    var updatedSlot = {};
    // Change the status of the slot if the status of the request is approved
    if (req.body.status === 'Accepted' && (existingOfficeSpace.status === 'Pending' || existingOfficeSpace.status === 'Rejected')) {
        updatedOfficeSpace = await officeSpaceModel.findByIdAndUpdate({id: req.body.officeSpaceId}, { availableSlots : existingOfficeSpace.availableSlots-1})        
        updatedSlot = await slotModel.findByIdAndUpdate({ id: req.body.slotId }, { status : 'unavailable' });
    } else if (req.body.status === 'Rejected' && existingOfficeSpace.status === 'Accepted') {
        updatedOfficeSpace = await officeSpaceModel.findByIdAndUpdate({id: req.body.officeSpaceId}, { availableSlots : existingOfficeSpace.availableSlots+1})        
        updatedSlot = await slotModel.findByIdAndUpdate({ id: req.body.slotId }, { status : 'available' });
    }

    // Send email regarding the rent request status
    await sendEmail(
        updatedRentRequest.email, 
        `Rent request for office space ${updatedRentRequest.status}`,
        `Dear ${updatedRentRequest.fullName}, \n\nYour request to rent a slot in the office space was ${updatedRentRequest.status} \n\nBest regards,\nOSSA`,
    );

    if (updatedOfficeSpace && updatedSlot) {
        res.status(StatusCodes.OK).json({ message: 'Rent request updated', rentRequest: updatedRentRequest})
    }
};

module.exports = { add, getAll, edit, findByOfficeSpaceId, findById, remove }