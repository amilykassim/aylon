export default (sequelize, DataTypes) => {
  const Feed = sequelize.define('Feed', {
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Feed.associate = (models) => {
    Feed.belongsTo(models.Category, {
      foreignKey: 'category_id',
    });
  };
  return Feed;
};
