/* eslint-disable no-unused-vars */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Chats', [{
    product_id: 1,
    from: 1,
    to: 2,
    message: 'Hello world',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Chats', null, {}); }
