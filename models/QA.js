const {INTEGER, STRING} = require('sequelize');
const db = require('../utils/database');

const QA = db.define('qa', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
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
    }
})

module.exports = QA;