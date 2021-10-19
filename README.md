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
    - In MySQL Workbench, run the following SQL:
        ```sql
        CREATE DATABASE stocked;
        use stocked;
        CREATE TABLE users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            username VARCHAR(32) NOT NULL,
            password VARCHAR(256) NOT NULL,
            PRIMARY KEY (id));
        ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootuser';
        CREATE TABLE ticker(
            ticker_symbol VARCHAR(5) NOT NULL,
            PRIMARY KEY(ticker_symbol)
        );
        CREATE TABLE user_ticker(
            user_id INT UNSIGNED NOT NULL,
            ticker VARCHAR(5) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (ticker) REFERENCES ticker(ticker_symbol)
        );
        CREATE TABLE chat_message(
            message_id BIGINT UNSIGNED NOT NULL,
            message_text VARCHAR(512) NOT NULL,
            creation_ts DATETIME NOT NULL,
            ticker VARCHAR(5) NOT NULL,
            user_id INT UNSIGNED NOT NULL,  
            FOREIGN KEY (ticker) REFERENCES ticker(ticker_symbol),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        ```

