/* eslint-disable no-unused-vars */

export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Shops', [{
    user_id: 2,
    name: 'Jordan Max',
    description: 'This is the ultra Jordan Max',
    image: 'https://www.dreamstime.com/bangkok-thailand-january-nike-shop-opening-siam-square-one-shopping-mall-popular-located-sqaure-image138469677',
    country_id: 1,
    active: true,
    is_verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_id: 1,
    name: 'AirMax',
    description: 'This is the ultra AirMax',
    image: 'https://www.dreamstime.com/bangkok-thailand-january-nike-shop-opening-siam-square-one-shopping-mall-popular-located-sqaure-image138469677',
    country_id: 1,
    active: true,
    is_verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Shops', null, {}); }
