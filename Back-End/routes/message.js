'use strict'

var express = require('express');
var messageController = require('../controllers/message');
var api = express.Router();
var middleAuth = require('../middlewares/authenticated');

api.get('/test-message', middleAuth.ensureAuth, messageController.test);
api.get('/my-messages/:page?', middleAuth.ensureAuth, messageController.getReceivedMessages);

api.post('/send-message', middleAuth.ensureAuth, messageController.sendMessage);

module.exports = api;