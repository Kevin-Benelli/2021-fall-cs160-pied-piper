A web-based stock chart and live chat program for Prof. Karra's CS160 course at SJSU. 

Hosted here: https://kevin-benelli.github.io/2021-fall-cs160-pied-piper/
All updates to master will get automatically deployed using Github Actions.

Dev steps:

1. Install nodejs and npm if you don't already have them

2. In stocked-express-backend directory:
    - npm install
    - npm install -g nodemon
    - Potentially may need to do npm install cors on its own here
    - nodemon socket-server.js 

3. In stocked-client directory:
    - npm install
    - npm start

React page will be on localhost:3000/2021-fall-cs160-pied-piper

Nodemon will be using localhost:5000

4. A local MySQL server must also be running.
    - Follow the steps on the MySQL documentation to install and start MySQL: https://dev.mysql.com/doc/mysql-getting-started/en/
    - Open a terminal window and change directory to /2021-fall-cs160-pied-piper/stocked-express-backend/
    - Run the following command with your MySQL user credentials. Do not include the asterisks *. 
        ````
        mysql -u*yourusername* -p*yourpassword*  < db_build.sql
        ````
    - The database should be successfully built, along with a new user with privileges for the database.
