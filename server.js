var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});

// connect to database
dbConn.connect(); 
 
// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
// Request type 'get' is used here, http://127.0.0.1:3000/users
 
// Retrieve user with id 
app.get('/user/:id', function (req, res) {
  
    let user_id = req.params.id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
  
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
  
});
// Request type 'get' is used here, http://127.0.0.1:3000/user/1
 
// Add a new user  
app.post('/user', function (req, res) {
  
    let user = req.body.user;
  
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }

    dbConn.query("INSERT INTO users SET ? ", [user], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});
//  Request type 'post' is used here and in Postman the data is posted in -> Body -> raw (JSON type) -> {"user_id": 16, "user": {"name": "max", "email": "max@gmail.com"} }
//  and the url is: http://127.0.0.1:3000/user
 
//  Update user with id
app.put('/user', function (req, res) {
  
    let user_id = req.body.user_id;
    let user = req.body.user;
  
    if (!user_id || !user) {
        return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }

    dbConn.query('UPDATE users SET ? WHERE id = ?', [user, user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});
 
 
//  Delete user
app.delete('/user', function (req, res) {

    let user_id = req.body.user_id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been deleted successfully.' });
    });
}); 
// http://127.0.0.1:3000/user and Request type is Delete and pass "user_id" in format "x-www-form-urlencoded" and key name as user_id and value as any numeric value
 
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;