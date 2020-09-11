const express = require('express');
const RecipeRouter = require('../data/recipes-router');

const db = require('../data/config');

const server = express();

server.use(express.json());
server.use('/api/recipes', RecipeRouter)
module.exports = server;