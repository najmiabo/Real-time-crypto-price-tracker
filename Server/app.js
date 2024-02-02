require('dotenv').config();

const express = require('express')
const { createServer } = require("http")
const cors = require('cors')
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express()
const server = createServer(app)

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use(errorHandler)


module.exports = { server, app }