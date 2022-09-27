const QAcontroller = require('../controllers/QA');


const QArouter = require('express').Router();

QArouter
    .post('/register',QAcontroller.Register)
    .post('/login', QAcontroller.Login)
    .post('/resetPassword', QAcontroller.ResetPassword)
    .post('/createAgent', QAcontroller.createAgent)
    .get('/getAgents', QAcontroller.getAllAgents)
    .get('/getAgents/:id', QAcontroller.getAgent)

module.exports = QArouter;