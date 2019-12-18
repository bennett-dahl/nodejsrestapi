var express = require('express');
var router = express.Router();
const mysql = require('mysql');

//router to get user detail by id
router.get('/user/:id', (req, res, next) => {

    //query the database with connection params.
    const userId = req.params.id; //variable to hold the userId passed into the GET request
    const queryString = "SELECT * FROM users WHERE id = ?" //variable holding the query string for said query

    //pass in the query string, and the linked variable
    getConnection().query(queryString, [userId],(err, rows, feilds) => {
        if(err){
            console.log('Query Failed:' + err);
            res.sendStatus(500); //remove this type of line for prod. Causes error to be displayed in browser. replace with res.sendStatus(500)
            return;
        } else if (rows.length > 0) { //check that the returned result isn't empty
            console.log('I think we got users successfully');

            res.render('userdetail', {
                id: rows[0].id,
                firstName: rows[0].firstName,
                lastName: rows[0].lastName,
                age: rows[0].age
            });
        } else {
            res.render('nouser', {
                id: userId
            });
        };
    });
});

//User creation router requires body parser in main app. names are derived from form attribute "name"
router.post('/user_create', (req, res) => {
    console.log("Creating new user....");

    const fName = req.body.createFirstName;
    const lName = req.body.createLastName;
    const age = req.body.createAge;

    const queryString = "INSERT INTO users (firstName, lastName, age) VALUES (?, ?, ?)";

    getConnection().query(queryString,[fName, lName, age], (err, results, feilds) => {
        if (err){
            console.log('Failed to insert new user: ' + err);
            res.sendStatus(500);
        } else {
            console.log('Inserted New User with id: ', results.insertId);
            res.redirect('/users');
        }
    });
    // getConnection().end();

    // res.json([fName,lName,age]);
});

//create connection pool for MySQL connection
const pool = mysql.createPool ({
    connectionLimit: 10,
    user: 'bff6c128cd0bfc',
    host: 'us-cdbr-iron-east-05.cleardb.net',
    password: 'ea11c111',
    database: 'heroku_e258587ef07f659'
});

function getConnection() {
    return pool;
};

module.exports = router;
