const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        postedBy: String,
        text: String,
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Articles = mongoose.model("Articles", articleSchema);

module.exports = { Articles };
