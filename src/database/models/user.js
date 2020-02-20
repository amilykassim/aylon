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
    role_value: DataTypes.INTEGER,
  }, {});
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    User.hasMany(models.Shop, {
      foreignKey: 'user_id',
    });
    User.hasMany(models.Report, {
      foreignKey: 'user_id',
    });
    User.belongsTo(models.Role, {
      foreignKey: 'role_value',
    });
    User.belongsTo(models.Country, {
      foreignKey: 'country_id',
    });
    User.hasOne(models.Preference, {
      foreignKey: 'user_id',
    });
  };
  return User;
};
