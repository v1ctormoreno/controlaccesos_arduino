CREATE USER 'controlaccessos'@'localhost' IDENTIFIED BY 'controlaccesos';
CREATE DATABASE controlacc;
GRANT ALL PRIVILEGES ON controlacc.* TO 'controlaccessos'@'localhost';
USE controlacc;
CREATE TABLE users(
    user_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    uid INT(20) NOT NULL,
    name VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    creation timestamp NOT NULL DEFAULT current_timestamp
);



CREATE TABLE entrances(
    entrance_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uid INT(20) NOT NULL,
    entrance timestamp NOT NULL DEFAULT current_timestamp
);


DESCRIBE users;
