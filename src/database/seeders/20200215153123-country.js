/* eslint-disable no-unused-vars */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Countries', [{
    name: 'Rwanda',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Countries', null, {}); }
