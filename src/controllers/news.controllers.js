import News from "../models/news.model.js";
import User from "../models/user.model.js";
import {
  response_200,
  response_404,
  response_500,
} from "../utils/responseCodes.js";

export async function topNews(req, res) {
  try {
    const news = await News.find({}).sort({ UpvoteCount: -1 });
    res.status(200).send(news);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function credibleNews(req, res) {
  try {
    const users = await User.find({}).sort({ myUpvotes: -1 });
    const usersNews = users.map((user) => getNewsOfUser(user.News));
    Promise.all(usersNews)
      .then((usersNews) => {
        const credibleNews = usersNews.reduce(
          (acc, news) => acc.concat(news),
          [],
        );
        res.status(200).send(credibleNews);
      })
      .catch((error) => {
        res
          .status(500)
          .send({ error: "Internal Server Error", details: error.message });
      });
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
}

function getNewsOfUser(newsIds) {
  return new Promise((resolve, reject) => {
    News.find({
      _id: {
        $in: newsIds,
      },
    })
      .then((news) => {
        resolve(news);
      })
      .catch(() => {
        reject();
      });
  });
}

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
