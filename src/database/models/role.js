export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    role_value: DataTypes.INTEGER,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Role.associate = (models) => {
    // associations can be defined here
    Role.hasMany(models.User, {
      foreignKey: 'role_value',
    });
  };
  return Role;
};
