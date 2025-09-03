-- Create database if not exists
CREATE DATABASE IF NOT EXISTS default_db;

USE default_db;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isPremium BOOLEAN NOT NULL,
    messagesLeft INT DEFAULT 50,
    firstMessageSentForPeriod BIGINT NOT NULL
);

-- Chats table
CREATE TABLE chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT fk_chats_users FOREIGN KEY (userId) REFERENCES users(id)
);

-- Messages table
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    isSentByAI BOOLEAN NOT NULL DEFAULT FALSE,
    sentTime BIGINT NOT NULL,
    chatId INT NOT NULL,
    CONSTRAINT fk_messages_chats FOREIGN KEY (chatId) REFERENCES chats(id)
);
