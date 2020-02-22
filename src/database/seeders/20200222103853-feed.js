/* eslint-disable no-unused-vars */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Feeds', [{
    category_id: 1,
    user_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Feeds', null, {}); }
