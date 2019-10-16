
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['beverage', 'food']],
          msg: 'Invalid category. You can beverage, food, etc...',
        },
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
// eslint-disable-next-line no-unused-vars
export function down(queryInterface, Sequelize) { return queryInterface.dropTable('Products'); }
