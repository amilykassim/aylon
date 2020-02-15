export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    shop_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
  }, {});
  Product.associate = (models) => {
    // associations can be defined here
    Product.belongsTo(models.Shop, {
      foreignKey: 'shop_id',
    });
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id',
    });
    Product.hasMany(models.Like, {
      foreignKey: 'product_id',
    });
    Product.hasMany(models.Chat, {
      foreignKey: 'product_id',
    });
  };

  return Product;
};
