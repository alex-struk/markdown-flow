CREATE DATABASE IF NOT EXISTS main;
USE main;
CREATE TABLE IF NOT EXISTS content (id int NOT NULL AUTO_INCREMENT, content LONGTEXT, content_address TEXT, name TEXT, PRIMARY KEY (id));