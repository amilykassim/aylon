export default (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    is_verified: DataTypes.BOOLEAN,
  }, {});
  Shop.associate = (models) => {
    // associations can be defined here
    Shop.belongsTo(models.User, {
      foreignKey: 'user_id',
    });

    Shop.belongsTo(models.Country, {
      foreignKey: 'country_id',
    });

    Shop.hasMany(models.Product, {
      foreignKey: 'shop_id',
    });
  };

  return Shop;
};
