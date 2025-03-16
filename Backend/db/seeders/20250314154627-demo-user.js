'use strict';
const bcrypt = require("bcryptjs"); // Correct bcryptjs import

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Ensure schema is set in production
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'; 
    return queryInterface.bulkInsert(options, [

      {
        email: 'demo@user.io', 
        username: 'Demo-lition', 
        hashedPassword: bcrypt.hashSync('password')
      }, 
      {
        email: 'user1@user.io', 
        username: 'FakeUser1', 
        hasheedPassword: bcrypt.hashSync('password2')
      }, 
      {
        email: 'user2user.io', 
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  }, 

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'; 
    const Op = Sequelize.Op; 
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
    }
  };
