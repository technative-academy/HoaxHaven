-- SQLBook: Code
-- Creating 'users' table
CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255), -- Passwords are stored but are not integral for now
        date_joined DATE NOT NULL
    );

-- Creating 'articles' table
CREATE TABLE
    articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        date_published DATE NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users (id) -- Foreign key reference to users table
    );

-- Creating 'tags' table
CREATE TABLE
    tags (
        id SERIAL PRIMARY KEY,
        tag_name VARCHAR(100) UNIQUE NOT NULL
    );

-- Creating 'article_tags' table with a composite primary key
CREATE TABLE
    article_tags (
        article_id INTEGER REFERENCES articles (id),
        tag_id INTEGER REFERENCES tags (id),
        PRIMARY KEY (article_id, tag_id) -- Composite primary key
    );