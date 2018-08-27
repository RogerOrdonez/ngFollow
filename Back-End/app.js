'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var userRoutes = require('./routes/user');
var followRoutes = require('./routes/follow');
var publicationRoutes = require('./routes/publication');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rutas
app.use('/api', userRoutes);
app.use('/api', followRoutes);
app.use('/api', publicationRoutes);

// exportar
module.exports = app;