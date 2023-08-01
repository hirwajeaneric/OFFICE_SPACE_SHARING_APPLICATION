const express = require('express');
const router = express.Router();

const { findById, getAll, add, attachFile, edit, findByOccupantId, findBySpaceId, findByStatus, remove, upload } = require('../controllers/slot.controllers');


router.post('/add', upload.array('pictures', 12), attachFile, add);
router.get('/list', getAll);
router.get('/findById', findById);
router.put('/update', upload.array('pictures', 12), attachFile, edit);
router.delete('/delete', remove);
router.get('/findByOccupantId', findByOccupantId);
router.get('/findBySpaceId', findBySpaceId);
router.get('/findByStatus', findByStatus);

module.exports = router;