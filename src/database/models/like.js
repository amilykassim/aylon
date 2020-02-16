export default (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Like.associate = (models) => {
    Like.belongsTo(models.Product, {
      foreignKey: 'product_id',
    });
  };
  return Like;
};
