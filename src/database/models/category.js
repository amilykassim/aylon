export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
    });
  };
  return Category;
};
