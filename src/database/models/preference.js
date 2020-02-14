export default (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
    user_id: DataTypes.INTEGER,
    email_notification: DataTypes.BOOLEAN,
    push_notification: DataTypes.BOOLEAN,
    auto_fill: DataTypes.BOOLEAN,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Preference.associate = (models) => {
    Preference.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Preference;
};
