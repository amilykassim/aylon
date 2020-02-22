/* eslint-disable no-unused-vars */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Categories', [{
    name: 'Male shoes',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Female shoes',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Shirts',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'T-shirts',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Hoodies',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Pants',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('Categories', null, {}); }
