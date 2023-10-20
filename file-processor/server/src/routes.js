const express = require('express');
const FileController = require('./controller');


const router = express.Router();

router.get('/read-multiple-files', FileController.readFileContent);


module.exports = router;