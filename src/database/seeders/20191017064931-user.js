/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';

const password = bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD, 10);
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Users', [{
    username: 'amilykassim',
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Users', null, {}); }
