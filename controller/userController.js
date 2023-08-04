// user registration
const createUser = async (req, res, next) => {
  //try {
    var db = req.db;
    // callback function
    const getRegResponse = (err, resp) => {
      let getRes;
      let status;

      if (err) {
        getRes = err.message;
        status = 0;
      } else {
        getRes = resp;
        status = 1;
      }

      const sendData = {
        responseMsg: getRes,
        responseCode: status,
      };

      res.statusCode = 200;

      console.log(sendData);

      res.setHeader("Content-Type", "application/json");
      res.send(sendData);
      res.end();
    };

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true); // you
    let userData = req.body;
    console.log(userData);

    const bcrypt = require("bcrypt");

    const passwordHash = bcrypt.hashSync(userData.password, 10);

    const params = [
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.username,
      passwordHash,
    ];

    // Authenticate Registration

    if (userData.username && passwordHash) {
      query = `
                            SELECT * FROM system_users 
                            WHERE username = "${userData.username}"
                            `;

      db.query(query, (error, result) => {
        if (error) {
          getRegResponse(error, false);
        } else {
          if (result.length > 0) {
            console.log(result.length);
            getRegResponse(
              new Error("You already have an account. Kindly Login"),
              null
            );
          } else {
            //insert into table and send response

            const sql = `insert into system_users (first_name, last_name, email, username, pwd) VALUES("${params[0]}", "${params[1]}", "${params[2]}", "${params[3]}", "${params[4]}")`;
            let query = db.query(sql, userData, (err, result) => {
              if (err) {
                throw err;
              }
              getRegResponse(false, "Registration Successful");
            });
          }
        }
      });
    }
 /* } catch (error) {
    res.send({
      message: "An error occured",
    });
  }*/
};

// user login
// user registration
const userLogin = async (request, response, next) => {
  try {
    var db = request.db;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Credentials", true); // you

    //Callback function

    const getResponse = (err, resp) => {
      let getRes;
      let status;

      if (err) {
        getRes = err.message;
        status = 0;
      } else {
        getRes = resp;
        status = 1;
      }

      const sendData = {
        responseMsg: getRes,
        responseCode: status,
      };

      response.statusCode = 200;

      response.setHeader("Content-Type", "application/json");
      response.send(sendData);
    };

    //login authentication
    let userData = request.body;

    const bcrypt = require("bcrypt");

    const passwordHash = bcrypt.hashSync(userData.password, 10);

    const params = [userData.username, userData.password];

    if (userData.username && passwordHash) {
      query = `
              SELECT * FROM system_users 
              WHERE username = "${userData.username}"
              `;

      db.query(query, (error, result) => {
        if (error) {
          getResponse(error, false);
        } else {
          if (result.length == 0) {
            getResponse(new Error("Invalid username"), null);
          } else {
            const hashedPassword = result[0].pwd;
            const response = bcrypt.compareSync(
              userData.password,
              hashedPassword
            );

            if (response == false) {
              getResponse(new Error("Password verification failed"), null);
            } else {
              const welcomeString = result[0].id;
              getResponse(null, welcomeString);
            }
          }
        }
        response.end();
      });
    } else {
      response.send("Please Enter Email Address and Password Details");
      response.end();
    }
  } catch (error) {
    response.send({
      message: "An error occured",
    });
  }
};

//get user
const getUser = async (request, response, next) => {
   try {
  var db = request.db;
  let sql = `SELECT * FROM system_users WHERE id = ${request.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    response.send(results);
  });
   } catch (error) {
        response.send({
          message: "An error occured",
        });
    }
};

module.exports = { createUser, userLogin, getUser };
