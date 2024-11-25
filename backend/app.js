require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(morgan('dev'));
// app.use(express.multipart());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'))
app.use(express.static(path.resolve(__dirname, 'adminpanel/build')));
app.use(express.static('output'))

require('./routes.js')(app);


module.exports = app;