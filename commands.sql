CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) 
VALUES ('jari', 'www.blogi.com', 'blogi1', 3);

INSERT INTO blogs (author, url, title, likes)
VALUES ('timo', 'www.blogi.com', 'blogi2', 1);
