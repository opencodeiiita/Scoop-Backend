import News from "../models/news.model.js";
import User from "../models/user.model.js";
import {
  response_200,
  response_500
} from "../utils/responseCodes.js";


export async function latestnews(req, res) {
    try {
      let news = await News.find().select("-Upvotes").sort({ createdAt: -1 }).limit(5);
  
      if(news.length == 0) throw new Error('No News to Fetch');

      // res.status(200).json({ news });
      return response_200(res, "Latest News", { news });
    } catch (error) {
      console.error("Error fetching latest news:", error);
      return response_500(res, "Error in fetching latest news", error);
    }
  }
  
  
  export async function topNews(req, res) {
    try {
      let news = await News.find({}).select("-Upvotes").sort({ UpvoteCount: -1 }).limit(5);

      if(news.length == 0) throw new Error('No News to Fetch');
        
      return response_200(res, "Top News", {news});
    } catch (error) {
      console.error(error);
      return response_500(res, "Error in fetching top news", error);
    }
  }
  
  export async function credibleNews(req, res) {
    try {
      const users = await User.find({News: {$exists: true, $ne: []}}).sort({ myUpvotes: -1 }).limit(5);
  
      if(users.length == 0) throw new Error('No Users found who have posted news');
  
      let usersNews = users.map(async (user) => 
      await News.find({_id : {$in: user.News}})
      .select("-Upvotes")
      .sort({createdAt: -1})
      .limit(1));
       
    usersNews = usersNews.map((news) => {delete news.Upvotes; return news; })

      return response_200(res, 'Credible News', {usersNews});
  
      
    } catch (err) {
      return response_500(res, "Error in fetching credible news", err);
    }
  }
  
  export async function getNewsCategories(req,res)
  {
    try
    {
      const news_tags = await News.distinct("Tags");


      if(news_tags.length == 0)
        throw new Error("No News Tags Found");
      return response_200(res, "News Categories", {news_tags});
      
    }
    catch(err)
    {
      return response_500(res, "Error in fetching news categories", err);
    }
  }