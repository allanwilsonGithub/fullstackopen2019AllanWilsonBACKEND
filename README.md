start backend using nodemon with 'npm run dev'

Online backend application at Heroku:
https://damp-beyond-63743.herokuapp.com

Push changes with:
git push heroku HEAD:master --force

heroku config:set MONGODB_URI=mongodb+srv://fullstack:<password>@cluster0-6rmsl.mongodb.net/bloglist-app?retryWrites=true&w=majority

=================
DONE blog can be deleted only by the user who added the blog.
TODO deleting a blog without a token returns a suitable status code.
TODO deleting a blog by a wrong user returns a suitable status code.
TODO : errors:
         missing token should return error (JsonWebTokenError: jwt must be provided)
         invalid token
         invalid blog id to delete
         



Note that if you fetch a blog from the database,

const blog = await Blog.findById(...)
the field blog.user does not contain a string, but an Object. So if you want to compare the id of the object fetched from the database and a string id, normal comparison operation does not work. The id fetched from the database must be parsed into a string first.

if ( blog.user.toString() === userid.toString() ) ...