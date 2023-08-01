const express = require('express');
const router = express.Router();

const user = require('./user.routes');
const slot = require('./slot.routes');
const officeSpace = require('./officeSpace.routes');
const rentRequest = require('./rentRequest.routes');
const emailRoutes = require('./email.routes');

router.use('/profile', express.static('./profiles'));
router.use('/space', express.static('./spaces'));

router.use('/email', emailRoutes);
router.use('/user', user);
router.use('/slot', slot);
router.use('/officeSpace', officeSpace);
router.use('/rentRequest', rentRequest);

module.exports = router;