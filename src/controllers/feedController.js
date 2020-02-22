/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import Helper from '../helpers/helper';
import FeedService from '../services/feedServices';

const helper = new Helper();
const { isAuth } = Helper;
const { addFeedService, getFeedService } = FeedService;

class FeedController {
  constructor() {
    this.addFeed = `addFeed(
      category: [Int!]!
    ): ${helper.successMessageSchemaName}`;
  }

  static async addFeed(args, req) {
    isAuth(req.user);

    const feeds = await getFeedService(req.user.id);
    const currentCategories = feeds.map((feed) => feed.category_id);

    // add current categories to incoming categories
    args.category.push(...currentCategories);

    // remove duplicates
    const categoriesToAdd = Array.from(new Set([...args.category]));
    const finalCategoryToAdd = categoriesToAdd;

    // remove the categories that are arleady in the database
    currentCategories.filter((currentCategoryId) => {
      categoriesToAdd.filter((categoryId) => {
        if (categoryId === currentCategoryId) {
          const index = finalCategoryToAdd.indexOf(categoryId);
          finalCategoryToAdd.splice(index, 1);
        }
      });
    });

    // add feed
    const data = finalCategoryToAdd.map((id) => {
      const feed = {};
      feed.user_id = req.user.id;
      feed.category_id = id;
      return feed;
    });


    data.map(async (feed) => {
      try {
        await addFeedService(feed);
      } catch (ex) {
        return { message: 'Failed to add the feed' };
      }
    });
    return { message: 'Added feed successfully' };
  }
}

export default FeedController;
