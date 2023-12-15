import News from "../models/news.model.js";
import User from "../models/user.model.js";

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

export function credibleNews(req, res) {
  return User.find({})
    .then((users) => {
      users.sort(
        (user1, user2) => user2.myUpvotes.length - user1.myUpvotes.length,
      );
      const getAllUsersNews = users.map((user) => getNewsOfUser(user.News));
      Promise.all(getAllUsersNews)
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
    })
    .catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
    });
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
