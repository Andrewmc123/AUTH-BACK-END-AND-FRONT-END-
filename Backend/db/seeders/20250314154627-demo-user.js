'use strict';
const bcrypt = require("bcryptjs"); // Correct bcryptjs import

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Ensure schema is set in production
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName
