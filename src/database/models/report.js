export default (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    user_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Report.associate = (models) => {
    Report.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Report;
};
