export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    user_id: DataTypes.INTEGER,
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {});
  Product.associate = (models) => {
    // associations can be defined here
    Product.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Product;
};
