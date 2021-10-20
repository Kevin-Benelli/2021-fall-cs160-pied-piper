/*
    This script creates the database and tables for the Stocked program.
*/

CREATE DATABASE stocked;

CREATE USER 'stocked_user'@'localhost' IDENTIFIED BY 'verysecretpass';
GRANT ALL PRIVILEGES ON stocked.* TO 'stocked_user'@'localhost';
FLUSH PRIVILEGES;
USE stocked; 

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL,
    password VARCHAR(256) NOT NULL,
    PRIMARY KEY (id));

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