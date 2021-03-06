'use strict'

var moment = require('moment');
var mongooseaPaginate = require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');
var Message = require('../models/message');

function test(request, response) {
    response.status(200).send({ message: 'Ruta de pruebas de servidor NodeJS' });
}

function sendMessage(request, response) {
    var params = request.body;
    if (!params.text || !params.receiver) {
        response.status(500).send({ message: 'Faltan parámetros para enviar un mensaje' });
    }
    var message = new Message();
    message.emitter = request.user.sub;
    message.receiver = params.receiver;
    message.text = params.text;
    message.created_at = moment().unix();
    message.viewed = 'false';
    message.save((err, messageSended) => {
        if (err) return response.status(500).send({ message: 'Error en la petición al mandar mensaje' });
        if (!messageSended) return response.status(404).send({ message: 'No se mandó ningún mensaje' });
        return response.status(200).send({ message: messageSended });
    });
}

function getReceivedMessages(request, response) {
    var userId = request.user.sub;
    var page = 1;
    if (request.params.page) {
        page = request.params.page;
    }
    var itemsPerPage = 8;
    Message.find({ receiver: userId })
        .populate('emitter', { 'name': 1, 'surname': 1, 'nick': 1, 'image': 1 })
        .sort('-created_at')
        .paginate(page, itemsPerPage, (err, messages, total) => {
            if (err) return response.status(500).send({ message: 'Error en la petición al buscar mensajes' });
            if (!messages) return response.status(404).send({ message: 'No hay mensajes' });
            return response.status(200).send({
                total,
                pages: Math.ceil(total / itemsPerPage),
                messages
            });
        });
}

function getSendedMessages(request, response) {
    var userId = request.user.sub;
    var page = 1;
    if (request.params.page) {
        page = request.params.page;
    }
    var itemsPerPage = 8;
    Message.find({ emitter: userId })
        .populate('emitter receiver', { 'name': 1, 'surname': 1, 'nick': 1, 'image': 1 })
        .sort('-created_at')
        .paginate(page, itemsPerPage, (err, messages, total) => {
            if (err) return response.status(500).send({ message: 'Error en la petición al buscar mensajes' });
            if (!messages) return response.status(404).send({ message: 'No hay mensajes' });
            return response.status(200).send({
                total,
                pages: Math.ceil(total / itemsPerPage),
                messages
            });
        });
}

function getUnviewedMessages(request, response) {
    var userId = request.user.sub;
    Message.count({ receriver: userId, viewed: 'false' }).exec((err, count) => {
        if (err) return response.status(500).send({ message: 'Error en la petición al buscar mensajes sin leer' });
        response.status(200).send({
            unviewed: count
        });
    });
}

function setViewedMessages(request, response) {
    var userId = request.user.sub;
    Message.update({ receiver: userId, viewed: 'false' }, { viewed: 'true' }, { multi: true }, (err, updatedMessage) => {
        if (err) return response.status(500).send({ message: 'Error en la petición' });
        return response.status(200).send({
            messages: updatedMessage
        });
    });
}

module.exports = {
    test,
    sendMessage,
    getReceivedMessages,
    getSendedMessages,
    getUnviewedMessages,
    setViewedMessages
}