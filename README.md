# Authentication Server : Role Based Access Control

implement Role Based Access Control (RBAC) using an Access Control List (ACL), allowing to not only restrict access to routes for valid users, but also based on the individual permissions we give each user.

[deployed url ](https://auth-api-raghad8.herokuapp.com/)


## Setup
Install

* Clone the repository from GitHub
* npm init -y
* install dependencies npm i express dotenv cors base-64 bcrypt mongoose jest @codefellows/supergoose 
* in .env file need :

            SECRET=123456
            PORT=5555
            MONGODB_URI=mongodb://localhost:27017/auth

Test
Run the command npm test to test and verify the server and the middle wares are working.
Run the command npm run lint for testing lint.

Run
Start the server using nodemon , npm start
npm test for testing 


# UML diagram 

![diagram ](./lab8.PNG)

