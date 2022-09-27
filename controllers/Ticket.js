const TICKET = require("../models/Ticket");

const createTicket = async (req, res) =>{
    try {
        const { title, description, assignee } = req.body;
        const ticket = await TICKET.create({
            title,
            description, 
            agentId: assignee
        });
      return res.status(201).json({
            message: 'Ticket created successfully',
            ticket
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({message: 'There was an error creating the ticket'});
    }
}
const getAllTickets = async (req, res) =>{
try {
    const tickets = await TICKET.findAll();
    return res.status(200).json({
        message: 'Tickets retrieved successfully',
        tickets
    });
} catch (error) {
    console.log(error);
    return res.status(404).json({message: 'There was an error getting the tickets'});
}
}
const getTicket = async (req, res) =>{
    try {
        const { id } = req.params;
        const ticket = await TICKET.findOne({
            where: {
                id
            }
        });
        return res.status(200).json({
            message: 'Ticket retrieved successfully',
            ticket
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({message: 'There was an error getting the ticket'});
    }

}
const updateTicket = async (req, res) =>{
    try {
        const { id } = req.params;
        const { title, description, status, assignee } = req.body;
        const ticket = await TICKET.update({
            title,
            description,
            status,
            assignee
        }, {
            where: {
                id
            }
        });
        return res.status(200).json({
            message: 'Ticket updated successfully',
            ticket
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({message: 'There was an error updating the ticket'});
    }

}

module.exports = {
    createTicket,
    getAllTickets,
    getTicket,
    updateTicket
}