import News from "../models/news.model.js";
import User from "../models/user.model.js";
import {
  response_200,
  response_201,
  response_404,
  response_400,
  response_500,
  response_204,
} from "../utils/responseCodes.js";
import mongoose from "mongoose";


export async function latestnews(req, res) {
  try {
    const news = await News.find().sort({ createdAt: -1 });

    if (!news) {
      return response_404(res, "News not found");
    }

    // res.status(200).json({ news });
    return response_200(res, "latest News", { news });
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return response_500(res, "Internal server error");
  }
}

export async function postNews(req, res) {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const {
      Headline,
      Location,
      Description,
      Tags, // upvoteCount is not taken as during posting it must be 0
      Comments,
    } = req.body;

    const news = new News({
      Headline: Headline,
      Location: Location,
      Description: Description,
      Tags: Tags,
      Comments: Comments,
      User: req.userId,
    });

    const postedNews = await news.save({ session });

    await User.findById(
      req.userId,
      { $push: { News: postedNews._id } },
      { session }
    );

    // commit the transaction
    await session.commitTransaction();

    return response_201(res, "News posted successfully", {
      id: postedNews._id,
      Headline: postedNews.Headline,
    });
  } catch (err) {
    await session.abortTransaction();
    return response_500(res, "Error in posting news", err);
  } finally {
    session.endSession();
  }
}

export async function upvoteNews(req, res) {
  let session;
  try {
    const newsId = req.params.scoopId;

    // checking if news exists
    const news = await News.findById(newsId);
    if (!news) return response_404(res, "News Not Found");

    // checking if user has already upvoted
    const user = await User.findById(req.userId);
    if (user.myUpvotes.includes(newsId))
      return response_400(res, "Already upvoted");

    // writing a trasaction for upvoting
    session = await mongoose.startSession();
    session.startTransaction();

    // updating news upvote count
    await News.findByIdAndUpdate(
      newsId,
      { $inc: { UpvoteCount: 1 } },
      { session }
    );

    // updating user's upvotes
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { myUpvotes: newsId } },
      { session }
    );

    // commit the transaction
    await session.commitTransaction();

    return response_201(res, "News posted successfully", {
      id: news._id,
      upvotes: news.upvoteCount + 1,
    });
  } catch (err) {
    await session.abortTransaction();
    return response_500(res, "Error in Upvoting", err);
  } finally {
    session.endSession();
  }
}

export async function getNews(req, res) {
  try {
    const newsId = req.params.scoopId;

    // checking if news exists
    const news = await News.findById(newsId);
    if (!news) return response_404(res, "News Not Found");

    return response_200(res, "News Retrieved", news);
  } catch (err) {}
}

export async function deleteNews(req, res) {
  try {
    const newsId = req.params.scoopId;

    // checking if news exists
    const news = await News.findById(newsId);
    if (!news) return response_404(res, "News Not Found");

    // writing a trasaction for upvoting
    session = await mongoose.startSession();
    session.startTransaction();
    // deletion query
    await News.findByIdAndDelete(newsId, { session });

    // updating user's upvotes
    await User.findByIdAndUpdate(
      req.userId,
      { $pop: { News: newsId } },
      { session }
    );

    // commit the transaction
    await session.commitTransaction();

    return response_204(res, "News deleted successfully");
  } catch (err) {
    await session.abortTransaction();
    return response_500(res, "Error in deleting news", err);
  } finally {
    session.endSession();
  }
}
