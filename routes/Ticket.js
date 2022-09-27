const TicketController = require('../controllers/Ticket');


const TicketRouter = require('express').Router();

TicketRouter
    .post('/createTicket', TicketController.createTicket)
    .get('/getTickets', TicketController.getAllTickets)
    .get('/getTickets/:id', TicketController.getTicket)
    .put('/updateTicket/:id', TicketController.updateTicket);

module.exports = TicketRouter;