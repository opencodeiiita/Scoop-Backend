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
import multer from 'multer';
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';import upload from "../middlewares/multerMiddleware.js"

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




export async function postNews(req, res) {
  try {
    
    
      //Save

    upload.single('headimage')(req,res,async (err)=>{
      
  
      const { Headline, Location, Description, Tags, Comments } = req.body;
      console.log(Headline)
      if(err){
        return response_400(res,err.message);
      }
      
      console.log(req.file)
      
      const headImageUrl = req.file ? await uploadToCloudinary(req.file)  : null ;
   
      const newsCreated = await News.create({
        Headline: Headline,
        Headimage: headImageUrl,
        Location: Location,
        Description: Description,
        Tags: Tags,
        Comments: Comments,
        User: req.userId,
      
      });
      await User.findByIdAndUpdate(
        req.userId,
        { $push: { News: newsCreated._id } },
        
      );

      res
        .status(201)
        .json({ msg: "Saved"});
      });
    } catch (err) {
      console.log(err)
      return response_500(res, "Error in Creating", err);
    }
  }

export async function upvoteNews(req, res) {
  try {
    const newsId = req.params.scoopId;

    // checking if news exists
    const news = await News.findById(newsId);
    if (!news) return response_404(res, "News Not Found");

    // checking if user has already upvoted
    if (news.Upvotes.includes(req.userId))
      return response_400(res, "Already upvoted");

    // updating news upvote count
    await News.findByIdAndUpdate(
      newsId,
      { $push: {Upvotes: req.userId},
        UpvoteCount: news.UpvoteCount +  1 },
    );


    return response_201(res, "News upvoted successfully", {
      news_id: news._id,
      upvotes: news.UpvoteCount + 1,
    });
  } catch (err) {
    return response_500(res, "Error in Upvoting", err);
  } 
}

export async function getNews(req, res) {
  try {
    const newsId = req.params.scoopId;
    console.log(newsId);
    // checking if news exists
    const news = await News.findById(newsId);
    if (!news) return response_404(res, "News Not Found");

    return response_200(res, "News Retrieved", news);

  } catch (err) {
    return response_500(res, "Error in Retrieving News", err);
  }
}

export async function deleteNews(req, res) {
  const session = await mongoose.startSession();
  try {
    const newsId = req.params.scoopId;

    // checking if news exists
    const news = await News.findById(newsId);
    if (!news) return response_404(res, "News Not Found");
    // checking if this user has created the news
    if(news.User != req.userId) return response_404(res, "This News is not created by this User");

    // writing a trasaction for upvoting
    session.startTransaction();
    // deletion query in News
    await News.findByIdAndDelete(newsId, { session });

    // update query in User
    await User.findByIdAndUpdate(req.userId, {$pull : {News: newsId}}, {session});

    // commit the transaction
    await session.commitTransaction();
    
    return response_200(res, "News deleted successfully");

  } catch (err) {
    try{
      await session.abortTransaction();
    }
    catch(error)
    {
      console.error("No transaction was started");
    }
    return response_500(res, "Error in deleting news", err);
  } finally {
    session.endSession();
} 
}
const uploadToCloudinary = async(file) =>{
  try{
    console.log('Uploading to Cloudinary...');
    console.log(file)
    const result = await cloudinaryV2.uploader.upload(file.path, {
      folder: 'new',
      resource_type: 'auto',
    });
    console.log('Upload successful:', result);
   return result.secure_url;
  }catch(error){
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Error uploading to Cloudinary');
  }
}