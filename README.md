# The Social Network
  ## license: MIT ![Github License](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)
  ### https://choosealicense.com/licenses/mit/
  ## Table of Contents:
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributors](#contributors)
  * [Tests](#tests)
  * [Questions](#questions)
  ## Project description:
  in this projet there is a set of API for a social network that uses MongoDB database so that the website can handle large amounts of unstructured data.
  ## Installation:
  - You must install the follwoing for this project to work:
  git clone the repo, once cloned open the project and in the command line type npm intsall express, npm install mongoose.
  ## Usage
  once everything is installed go ahead and npm start, launch insomnia and link you local host. play around and create a GET Method and see what returns.
  ## Features:
  your able to test the APIs
  ## contributoors:
  consult me if you want to contribute.
  ## Test:
  Run the following commands in your terminal to test this project.
  to test the API:


  api/users 
  GET all users 
  POST a new user 

  /api/users/:userid
  GET a single user by its _id
  PUT to update a user by its _id
  DELETE to remove a user by its _id

  /api/users/:userid/friends/:friends
  POST to add a new friend to a user's friend list
  DELETE to remove a friend from a user's friend list
  
  /api/thoughts 
  GET all thoughts 
  POST to create a new thought

  /api/thoughts/:thoughtsId
  GET to get a single thought by its _id 
  POST to update a thought by its _id
  DELETE to remove a thought by its _id 

  /api/thoughts/:thoughtsId/reactions 
  POST to create a reaction

  
  ## credits:
  Alexzoo0
  ## Questions:
  Any questions you may have, don't hesitate to reach out, below is my contact info.
  Github: https://github.com/alexzoo0
  Email: alexisvelasquez15@gmail.com
