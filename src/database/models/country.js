export default (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: DataTypes.STRING,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Country.associate = (models) => {
    Country.hasMany(models.User, {
      foreignKey: 'country_id',
    });

    Country.hasMany(models.Shop, {
      foreignKey: 'country_id',
    });
  };
  return Country;
};
