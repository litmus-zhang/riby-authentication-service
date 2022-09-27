const {INTEGER, STRING, ENUM} = require('sequelize');
const db = require('../utils/database');

const TICKET = db.define('ticket', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false
    },
    status: {
        type: ENUM('open', 'closed'),
        defaultValue: 'open',
        allowNull: false
    },
    agentId: {
        type: INTEGER,
        allowNull: true
    }
})

module.exports = TICKET;