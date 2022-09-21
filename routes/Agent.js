const AgentController = require('../controllers/QA');


const AgentRouter = require('express').Router();

AgentRouter
    .post('/login', AgentController.Login)
    .post('/resetPassword', AgentController.ResetPassword)

module.exports = AgentRouter;