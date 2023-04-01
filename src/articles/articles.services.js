const { Articles } = require("./articles.model");

const getArticles = async (articleId) => {
  try {
    const result = await Articles.findOne({ name: articleId });
    return result;
  } catch (error) {
    throw error;
  }
};

const putUpvotes = async (articleId, uid) => {
  try {
    await Articles.updateOne(
      { name: articleId },
      { $inc: { upvotes: 1 }, $push: { upvoteIds: uid } }
    );
    const result = await Articles.findOne({ name: articleId });
    return result;
  } catch (error) {
    throw error;
  }
};

const postComments = async (articleId, email, text) => {
  await Articles.updateOne(
    { name: articleId },
    { $push: { comments: { postedBy: email, text } } }
  );
  const result = await Articles.findOne({ name: articleId });
  return result;
};

module.exports = { getArticles, putUpvotes, postComments };
