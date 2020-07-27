start backend using nodemon with 'npm run dev'

Online backend application at Heroku:
https://damp-beyond-63743.herokuapp.com

Push changes with:
git push heroku HEAD:master --force

heroku config:set MONGODB_URI=mongodb+srv://fullstack:<password>@cluster0-6rmsl.mongodb.net/bloglist-app?retryWrites=true&w=majority

=================

DONE add any real user when creating a blog
DONE listing all blogs includes creator's user information with each blog
  user: username, name, id
TODO listing all users also displays the blogs created by each user
  blogs: url, title, author, 