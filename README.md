# SCOOP
Scoop is your window to the heartbeat of campus life. Engage, explore, and uncover the latest campus insights in real-time. This is your space to share and discover news that truly matters.

## Tech Stack 
* NodeJS
* ExpressJS
* MongoDB
* React


## 🚀 Features

1. **News Unleashed:**
   - Scoop is your go-to platform for breaking campus news. Share the latest updates, events, and noteworthy happenings with the community. Your news, your voice.

2. **Upvote Power**
   - Every user has the ability to shape the narrative. Upvote the most relevant and impactful news, ensuring that the most significant stories rise to the top.

3. **Verified Badge Prestige:**
   - Become a recognized campus news authority. The user with the most upvoted news profile earns a prestigious verified badge, symbolizing their influence and commitment to delivering quality information.

4. **Chronicle Rankings:**
   - Scoop doesn’t just share news; it prioritizes the most impactful stories. The most upvoted news articles secure a prime position at the top, ensuring that the campus community stays informed with the best content.

5. **Admin Dashboard:**
   - An admin will have the authority to delete or edit news shared by regular user.

6. **Community Informed**
   - Engage in meaningful discussions around the latest news. Foster a sense of community by sharing opinions, insights, and reactions to the stories that matter most.

## Join The Scoop Revolution
Scoop is a revolution in campus journalism. Together, let's elevate the way we share, consume, and engage with campus news. Your insights, your influence - let the Scoop revolution begin!
 
## Installation

```bash
  npm install 
  npm run dev
```
Make sure you have required enviornment variables saved in the ```.env``` file in the root of the project. A file ```.env.example``` is attached for reference.

## Claim an issue
Comment on the issue. In case of no activity on the issue even after 2 days, the issue will be reassigned. If you have difficulty approaching the issue, feel free to ask on our discord channel.

## Communication 
Whether you are working on a new feature or facing a doubt please feel free to ask us on our [discord](https://discord.gg/D9999YTkS8) channel. We will be happy to help you out.

## Guidlines 
Please help us follow the best practice to make it easy for the reviewer as well as the contributor. We want to focus on the code quality more than on managing pull request ethics.

- People before code: If any of the following rules are violated, the pull-requests must not be rejected. This is to create an easy and joyful onboarding process for new programmers and first-time contributors.

- Single commit per pull request and name the commit as something meaningful, example: Adding <-your-name-> in students/mentors section.

- Reference the issue numbers in the commit message if it resolves an open issue. Follow the [PR Template](https://github.com/opencodeiiita/SaveMyForm-Frontend/blob/main/.github/pull_request_template.md) Issue: < ISSUE NUMBER >

- Provide the link to live gh-pages from your forked repository or relevant screenshot for easier review.

- Pull Request older than 3 days with no response from the contributor shall be marked closed.

- Do not make PR which is not related to any issues. You can create an issue and solve it once we approve them.

- Avoid duplicate PRs, if need be comment on the older PR with the PR number of the follow-up (new PR) and close the obsolete PR yourself.

- Be polite: Be polite to other community members.

## API Endpoints
- **Authentication Routes:** 
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Authenticate and log in a user.

- **Users Routes:**
   - `POST /api/users/:userId/upvote`: Upvote an user. (auth required)
   - `POST /api/users/:userId/downvote`: Downvote an user. (auth required)

- **Profile Routes:**
   - `GET /api/profile/:userId`: Get user profile details.
   - `PUT /api/profile/:userId`: Update user profile details.  (auth required)
   - `GET /api/profile/:userId/news`: Get news articles posted by a specific user.

- **News Routes:**
   - `POST /api/news/post`: Allow users to post news (auth required)
   - `POST /api/news/:newsId/upvote`: Upvote a news. (auth required)
   - `GET /api/news/:userId/feed`: Get a personalized news feed for a user (based on followed users, and trending news).  (auth required)

- **Comments Routes:**
   - `GET /api/news/:newsId/comments`: Get comments for a news article
   - `POST /api/news/:newsId/comments`: Add a new comment to a news (auth required)
   - `PUT /api/news/:newsId/comments/:commentId`: Edit a comment (auth required)

-  **General Routes:**
   - `GET /api/trending/news`: Get trending news articles.
   - `GET /api/recommended/users`: Get recommended users to follow. (auth required)

 - **Admin Routes:**
     - `DELETE /api/admin/news/:newsId`: Admin can delete any news article
