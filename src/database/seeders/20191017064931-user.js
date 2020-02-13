/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';

const password = bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD, 10);
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Users', [{
    username: 'amilykassim',
    password,
    email: 'amilykassim02@gmail.com',
    display_name: 'king kunta',
    phone_number: '0782228870',
    profile_image: 'image url',
    gender: 'male',
    active: true,
    country_id: 1,
    role_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Users', null, {}); }
