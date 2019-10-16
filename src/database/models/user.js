export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    is_notification_allowed: DataTypes.BOOLEAN,
    is_admin: DataTypes.BOOLEAN,
  }, {});
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    User.hasMany(models.Product, {
      foreignKey: 'user_id',
    });
  };
  return User;
};
