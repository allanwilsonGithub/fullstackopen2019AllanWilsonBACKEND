start backend using nodemon with 'npm run dev'

Online backend application at Heroku:
https://damp-beyond-63743.herokuapp.com

Push changes with:
git push heroku HEAD:master --force

heroku config:set MONGODB_URI=mongodb+srv://fullstack:<password>@cluster0-6rmsl.mongodb.net/bloglist-app?retryWrites=true&w=majority



TODO:
add middleware.js for errorHandler
https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing

https://fullstackopen.com/en/part4/testing_the_backend
define the test environment
write tests that use their own separate database

TEST1: 
use supertest
HTTP GET request to the /api/blogs url.
Verify returns the correct amount of blog posts
Verify it's in JSON format.