var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

var QARouter = require('./routes/QA');
const TicketRouter = require('./routes/Ticket');
const AgentRouter = require('./routes/Agent');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/qa', QARouter);
app.use('/api/v1/agent', AgentRouter);
app.use('/api/v1/ticket', TicketRouter);

module.exports = app;
