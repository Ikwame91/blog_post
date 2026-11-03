# Kwame's Blog: Express + MongoDB blog

A server-rendered blog built on the [Start Bootstrap Clean Blog](https://startbootstrap.com/theme/clean-blog/) theme, with a full Node backend:

- User registration and login (bcrypt-hashed passwords, express-session)
- Create posts with an image upload (logged-in users only)
- Post pages, author info, and title search on the home page
- Flash messages for validation errors (e.g. "Username already taken")

The app lives in [`node_express_temp/`](node_express_temp). The `index.js` at the repo root is an earlier static-page experiment.

## Run it locally

```bash
cd node_express_temp
npm install
cp .env.example .env    # set CONNECTION_STRING and SESSION_SECRET
npm start               # http://localhost:4000
```

A local MongoDB works fine: `docker run -d -p 27017:27017 mongo:7`, then `CONNECTION_STRING=mongodb://localhost:27017/blog_database`.

## Routes

| Method | Path | What it does |
|---|---|---|
| GET | `/` | All posts (`?search=` filters by title) |
| GET | `/post/:id` | One post (404 for unknown ids) |
| GET | `/posts/new` | New-post form (login required) |
| POST | `/posts/store` | Save post + image (login required) |
| GET/POST | `/auth/register`, `/users/register` | Sign up |
| GET/POST | `/auth/login`, `/users/login` | Log in |
| GET | `/auth/logout` | Log out |

## Security notes

- Secrets come only from environment variables. `.env` is gitignored, and you should never commit it.
- Uploaded file names are sanitised and given a unique prefix, and only image types are accepted.
- Search input is regex-escaped.

Deploys to Heroku via the `Procfile` (`web: node index.js`).
