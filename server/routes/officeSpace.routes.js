const express = require('express');
const router = express.Router();

const { findById, getAll, add, attachFile, edit, findByLocation, findByMapCoordinates, findByOwnerId, findByStatus, remove, upload } = require('../controllers/officeSpace.controllers');

router.post('/add', upload.single('picture'), attachFile, add);
router.get('/list', getAll);
router.get('/findById', findById);
router.put('/update', upload.single('picture'), attachFile, edit);
router.delete('/delete', remove);
router.get('/findByLocation', findByLocation);
router.get('/findByMapCoordinates', findByMapCoordinates);
router.get('/findByOwnerId', findByOwnerId);
router.get('/findByStatus', findByStatus);

module.exports = router;