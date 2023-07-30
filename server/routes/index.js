const express = require('express');
const router = express.Router();

const user = require('./user.routes');
const contract = require('./contract.routes');
const officeSpace = require('./officeSpace');
const rentRequest = require('./rentRequest.routes');
const emailRoutes = require('./email.routes');

router.use('/profile', express.static('./profiles'));
router.use('/space', express.static('./spaces'));

router.use('/email', emailRoutes);
router.use('/user', user);
router.use('/contract', contract);
router.use('/officeSpace', officeSpace);
router.use('/rentRequest', rentRequest);

module.exports = router;