const {INTEGER, STRING, ENUM} = require('sequelize');
const db = require('../utils/database');

const AGENT = db.define('agent', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: STRING,
        allowNull: false
    },
    lastname: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING,
        allowNull: false
    },
    role: {
        type: ENUM('admin', 'agent'),
        defaultValue: 'agent',
        allowNull: false
    }
})

module.exports = AGENT;