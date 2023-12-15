import News from "../models/news.model.js";

export function topNews(req, res) {
  return News.find({})
    .then((news) => {
      news.sort((n1, n2) => n2.UpvoteCount - n1.UpvoteCount);
      res.status(200).send(news);
    })
    .catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
    });
}
