/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import Helper from '../helpers/helper';
import CategoryService from '../services/categoryServices';
import Validations from '../validations/categoryValidation';

const helper = new Helper();
const { isAuth } = Helper;
const {
  addCategoryService, getCategoryService, editCategoryService,
  findCategoryByUsername, deleteCategoryService,
} = CategoryService;
const { validateCategory } = Validations;

class CategoryController {
  constructor() {
    this.schemaName = 'Category';
    this.schema = `
        type ${this.schemaName} {
        id: ID!
        name: String!,
        createdAt: String!
        updatedAt: String!
      }`;

    this.addCategory = `addCategory(
      name: String!
    ): [${this.schemaName}]`;

    this.getCategory = `getCategory(
      id: Int
    ): [${this.schemaName}]`;

    this.editCategory = `editCategory(
      id: Int!
      name: String!
    ): [${this.schemaName}]`;

    this.deleteCategory = `deleteCategory(
      id: Int!
    ): ${helper.successMessageSchemaName}`;
  }

  static async addCategory(args, req) {
    isAuth(req.user);

    const { error } = validateCategory(args);
    if (error) throw new Error(error.details[0].message);

    const category = await findCategoryByUsername(args.name);
    if (category) throw new Error('Category with the same name exists');

    return addCategoryService(args);
  }

  static async getCategory(args, req) {
    isAuth(req.user);

    const category = await getCategoryService(args.id);
    if (!category) throw new Error(`Product with id ${args.id} does not exists`);

    return category;
  }

  static async editCategory(args, req) {
    isAuth(req.user);

    const { error } = validateCategory(args);
    if (error) throw new Error(error.details[0].message);

    return editCategoryService(args);
  }

  static async deleteCategory(args, req) {
    isAuth(req.user);

    const category = await deleteCategoryService(args.id);
    if (!category) throw new Error(`Product with id ${args.id} does not exists`);

    return { message: 'deleted category successfully' };
  }
}

export default CategoryController;
