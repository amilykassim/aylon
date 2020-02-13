export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    display_name: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    gender: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  }, {});
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    User.hasMany(models.Product, {
      foreignKey: 'user_id',
    });
  };
  return User;
};
