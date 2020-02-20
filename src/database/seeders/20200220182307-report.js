/* eslint-disable no-unused-vars */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Reports', [{
    user_id: 1,
    description: 'Can you please add payment to the platform',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Reports', null, {}); }
