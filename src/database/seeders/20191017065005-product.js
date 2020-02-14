/* eslint-disable no-unused-vars */

export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Products', [{
    shop_id: 1,
    name: 'AirMax',
    description: 'This is the ultra AirMax',
    image1: 'https://www.dickssportinggoods.com/p/nike-mens-air-max-270-shoes-19nikmrmx270blkpnmns/19nikmrmx270blkpnmns',
    image2: 'https://www.dickssportinggoods.com/p/nike-mens-air-max-270-shoes-19nikmrmx270blkpnmns/19nikmrmx270blkpnmns',
    image3: 'https://www.dickssportinggoods.com/p/nike-mens-air-max-270-shoes-19nikmrmx270blkpnmns/19nikmrmx270blkpnmns',
    category_id: 1,
    price: 18000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    shop_id: 1,
    name: 'Long sleeve T-shirt',
    description: 'Blue and White sleeve T-shirt',
    image1: 'https://84000trendz.com/product/long-sleeve-t-shirts-white-black-combination-for-men/',
    image2: 'https://84000trendz.com/product/long-sleeve-t-shirts-white-black-combination-for-men/',
    image3: 'https://84000trendz.com/product/long-sleeve-t-shirts-white-black-combination-for-men/',
    category_id: 2,
    price: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Products', null, {}); }
