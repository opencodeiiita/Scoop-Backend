import News from "../models/news.model.js";
import Comment from "../models/comments.model.js";
import {
  response_200,
  response_204,
  response_500,
  response_201,
  response_404,
  response_400
} from "../utils/responseCodes.js";
import mongoose from "mongoose";


export async  function getComments(req, res)
{
    try {
        const newsId = req.params.scoopId;
        const news = await News.findById(newsId);

        if(!news) return response_404(res, "News Not Found");

        let comments = news.Comments;

        if(comments.length == 0) return response_204(res, "No Comments Found");

        comments = await Comment.find({_id : {$in: comments}});
     
        return response_200(res, "Comments Fetched Successfully", {comments});
    } catch (error) {
        return response_500(res, "Error in fetching comments", error);
    }
}

export async function postComment(req, res)
{
    const session  = await mongoose.startSession();
    try{
        const newsId = req.params.scoopId;
        const userId = req.userId;
        const news = await News.findById(newsId);
        if(!news) return response_404(res, "News Not Found");

        session.startTransaction();

        const comment = new Comment({
            Comment: req.body.Comment,
            User: userId,
            News: newsId,
        });

        const postedComment = await comment.save({session});

        await News.findByIdAndUpdate(newsId, {$push: {Comments: postedComment._id}}, {session});

        await session.commitTransaction();

        return response_201(res, "Comment posted successfully", {
            id: postedComment._id,
            Comment: postedComment.Comment,
        });

    }
    catch(err)
    {
        try{
        await session.abortTransaction();
        }
        catch (error){console.error("No transaction was started")};

        return response_500(res, "Error in posting comment", err);
    }
    finally{
        session.endSession();
    }
}


export async function editComment(req, res)
{
    try {
        const commentId = req.params.commentId;
        const userId = req.userId;
        const newsId = req.params.scoopId;

        const comment = await Comment.findById(commentId);

        if(!comment) return response_404(res, "Comment Not Found");

        if(comment.News != newsId) return response_400(res, "Comment does not belong to this news");

        if(comment.User != userId) return response_400(res, "This comment was not written by this user");

        comment.Comment = req.body.Comment;

        const updatedComment = await comment.save();

        return response_200(res, "Comment edited successfully",{updatedComment});
    } catch (error) {
        return response_500(res, "Error in editing comment", error);
    }
}