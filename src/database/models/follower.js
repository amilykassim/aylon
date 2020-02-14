export default (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    shop_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Follower.associate = (models) => {
    Follower.hasMany(models.User, {
      foreignKey: 'follower_id',
    });
  };
  return Follower;
};
