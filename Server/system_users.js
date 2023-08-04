class system_users {

    getDbCon() {

        const mysql = require('mysql');

        const mysqlCon = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'nodemysql'
         });

        mysqlCon.connect(function(err) {
            if (err) {
                console.log(err.message);
            }
        });

        return mysqlCon;
    }

    queryDb(sql, params, callBack){

       const mysqlCon = this.getDbCon();

       mysqlCon.query(sql, params, function (err, result) {
           if (err) {
               callBack(err, null);
           } else {
               callBack(null, result);
           }
       });

    }

    createUser(jsonData,  callBack){
       const userData = jsonData;

       const bcrypt = require('bcrypt');

       //const passwordHash = bcrypt.hashSync(userData.password, 10);

       const params = [userData.first_name, userData.last_name, userData.username, userData.password];

       const sql = `insert into system_users (first_name, last_name, email, username, pwd) VALUES("${params[0]}", "${params[1]}", "${params[2]}", "${params[3]}", "${userData.password}")`;

       this.queryDb(sql, params, callBack);

    }

    verifyUser(username, password, callBack){

       const bcrypt = require('bcrypt');

       const sql = "select * from system_users where username = ?";
       const params = [username];

       this.queryDb(sql, params, function(err, result) {

          if (err) {

              callBack(err, false);

          } else {

              if (result.length == 0) {

                  callBack(new Error("Invalid username."), null);

              } else {

                  var hashedPassword = result[0].pwd;
                  var response = bcrypt.compareSync(password, hashedPassword);

                  if (response == false) {
                      callBack(new Error("Password verification failed."), null);
                  } else {
                      callBack(null, result);
                  }
              }
          }
       });
    }
}

module.exports = system_users;