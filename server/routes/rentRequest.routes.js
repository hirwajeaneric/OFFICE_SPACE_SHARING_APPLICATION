const express = require('express');
const router = express.Router();

const { findById, add, remove, findByOfficeSpaceId, edit, getAll } = require('../controllers/rentRequest.controllers');

router.post('/add', add);
router.get('/list', getAll);
router.get('/findById', findById);
router.get('/findByOfficeSpaceId', findByOfficeSpaceId);
router.put('/update', edit);
router.delete('/delete', remove);

module.exports = router;