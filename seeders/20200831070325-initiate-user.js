const bcrypt = require('bcrypt')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
  await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      password: bcrypt.hashSync('12345678', 10),
      email: '',
      avatar: '',
      birth_date: '1980-12-01',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW')
    }], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
