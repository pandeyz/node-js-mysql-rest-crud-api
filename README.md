# node-js-mysql-rest-crud-api
Demo implementation of node js mysql rest crud api

Step I:
mkdir nodejs-rest-api
cd nodejs-rest-api

Step II:
npm init --yes
npm install

Step III:
npm install express --save
npm install mysql --save
npm install body-parser --save

Database structure:
-- Table structure for users
CREATE TABLE IF NOT EXISTS users (
id int(11) NOT NULL,
name varchar(200) NOT NULL,
email varchar(200) NOT NULL,
created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users MODIFY id int(11) NOT NULL AUTO_INCREMENT;

-- Insert data into database :
INSERT INTO users (id, name, email, created_at) VALUES
(1, 'Test', 'test@g.co', '2019-02-28 13:20:20'),
(2, 'john', 'john@g.co', '2019-02-28 13:20:20'),
(3, 'tutsmake', 'tuts@g.co', '2019-02-28 13:20:20'),
(4, 'tut', 'tut@g.co', '2019-02-28 13:20:20'),
(5, 'mhd', 'mhd@g.co', '2019-02-28 13:20:20');

Step III:
> npm start
