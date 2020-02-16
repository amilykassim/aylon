/* eslint-disable no-unused-vars */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Preferences', [{
    user_id: 1,
    email_notification: true,
    push_notification: true,
    auto_fill: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_id: 2,
    email_notification: true,
    push_notification: true,
    auto_fill: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Preferences', null, {}); }
