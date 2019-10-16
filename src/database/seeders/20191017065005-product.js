/* eslint-disable no-unused-vars */

export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Products', [{
    user_id: 1,
    category: 'beverage',
    name: 'Redbull',
    price: 2000,
    quantity: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_id: 1,
    category: 'beverage',
    name: 'Coca-Cola',
    price: 3000,
    quantity: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_id: 2,
    category: 'beverage',
    name: 'Pepsi',
    price: 3000,
    quantity: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Products', null, {}); }
