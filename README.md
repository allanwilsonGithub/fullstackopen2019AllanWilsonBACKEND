start backend using nodemon with 'npm run dev'

Online backend application at Heroku:
https://damp-beyond-63743.herokuapp.com

Push changes with:
git push heroku HEAD:master --force

heroku config:set MONGODB_URI=mongodb+srv://fullstack:<password>@cluster0-6rmsl.mongodb.net/bloglist-app?retryWrites=true&w=majority



TODO:
=== 4.8: Blog list tests, step1 ===
Verify returns the correct amount of blog posts
refactor the route handler to use the async/await syntax instead of promises
USE:
https://jestjs.io/docs/en/expect.html#tocontainequalitem