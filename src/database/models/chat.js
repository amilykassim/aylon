export default (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    product_id: DataTypes.INTEGER,
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    message: DataTypes.STRING,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Chat.associate = (models) => {
    Chat.belongsTo(models.Product, {
      foreignKey: 'product_id',
    });
  };
  return Chat;
};
