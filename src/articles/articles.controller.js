// const articelInfo = require("../dummy data/dummyData");
const {
  getArticles,
  putUpvotes,
  postComments,
} = require("./articles.services");

const articles = async (req, res) => {
  try {
    const { name } = req.params;
    const { uid } = req.user;
    const article = await getArticles(name);

    if (article) {
      const upvoteIds = article.upvoteIds || [];
      article.canUpvote = uid && !upvoteIds.includes(uid);
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "User not found!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error });
  }
};

const updateUpvotes = async (req, res) => {
  try {
    const { articleId } = req.params;

    const { uid } = req.user;

    const article = await getArticles(articleId);

    if (article) {
      const upvoteIds = article.upvoteIds || [];
      console.log(upvoteIds);
      const canUpvote = uid && !upvoteIds.includes(uid);

      if (canUpvote) {
        const updatedArticle = await putUpvotes(articleId, uid);
        res.status(200).json(updatedArticle);
      }
    } else {
      res.send("That article doesn't exist");
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error });
  }
};

const addComments = async (req, res) => {
  try {
    const { text } = req.body;
    const { articleId } = req.params;
    const { email } = req.user;
    const article = await postComments(articleId, email, text);
    if (article) {
      return res.status(200).json(article);
    } else {
      res.status(404).json({ message: "User not found!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error });
  }
};

module.exports = { articles, updateUpvotes, addComments };
