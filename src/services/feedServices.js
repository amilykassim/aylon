import database from '../database/models';

class FeedService {
  static async addFeedService(feed) {
    return database.Feed.create(feed);
  }

  static async getFeedService(userId) {
    const feeds = await database.Feed.findAll({ where: { user_id: userId } });
    if (!feeds) return null;
    return feeds.map(({ dataValues: feed }) => feed);
  }
}

export default FeedService;
