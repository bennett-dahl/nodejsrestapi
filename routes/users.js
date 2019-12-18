var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {

  const allUserData = [];
  getConnection().query("SELECT * FROM users", (err, rows, feilds) => {
    if(err){
      console.log('Query Failed:' + err);
      res.sendStatus(500); //remove this type of line for prod. Causes error to be displayed in browser. replace with res.sendStatus(500)
      // getConnection().end();
      return;
    } else {
      rows.forEach((user) => {
        allUserData.push(user);
      });
      // getConnection().end();
      res.render('users', { users: allUserData });
    };
  });
});

const pool = mysql.createPool ({
  connectionLimit: 10,
  user: 'PQfeTWhyLZ',
  host: 'remotemysql.com',
  password: 'a5LWjOXkxG',
  database: 'PQfeTWhyLZ'
});

function getConnection() {
  return pool;
};

module.exports = router;
