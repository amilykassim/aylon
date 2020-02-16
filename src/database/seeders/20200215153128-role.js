/* eslint-disable no-unused-vars */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Roles', [{
    name: 'admin',
    role_value: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'super_admin',
    role_value: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Roles', null, {}); }
