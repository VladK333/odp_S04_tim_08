DROP TABLE IF EXISTS `users`;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    phone_number VARCHAR(20),
    type ENUM('guest', 'regular', 'premium') NOT NULL DEFAULT 'regular',
    img_src VARCHAR(255) DEFAULT '/images/user.png',
    messages_left INT DEFAULT 50,
    messages_reset_at TIMESTAMP NULL, -- vreme kada kreće brojanje 24h
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


LOCK TABLES `users` WRITE;

UNLOCK TABLES;