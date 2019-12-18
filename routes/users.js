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
      res.render('users', { users: allUserData, active: 'users' });
    };
  });
});

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
