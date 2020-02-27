import database from '../database/models';

class CategoryService {
  static async addCategoryService(category) {
    const result = await database.Category.create(category);
    return [result.dataValues];
  }

  static async findCategoryByUsername(name) {
    return database.Category.findOne({ where: { name } });
  }

  static async editCategoryService(category) {
    await database.Category.update(category, { where: { id: category.id } });

    const result = await database.Category.findOne({ where: { id: category.id } });
    return [result.dataValues];
  }

  static async getCategoryService(id) {
    // get only one category
    if (id) {
      const category = await database.Category.findOne({ where: id });
      if (!category) return null;
      return [category.dataValues];
    }

    // get all of the categories
    const categories = await database.Category.findAll();
    return categories.map(({ dataValues: category }) => category);
  }

  static async deleteCategoryService(id) {
    return database.Category.destroy({ where: { id } });
  }
}

export default CategoryService;
