//Create Database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database Created");
  });
});

//Create Table
app.get("/createemployee", (req, res) => {
  let sql =
    "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee table created");
  });
});

app.get("/register", (req, res) => {
  let sql =
    "CREATE TABLE register(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Table created");
  });
});

app.get("/system_users", (req, res) => {
  let sql =
    "CREATE TABLE system_users(id int AUTO_INCREMENT, first_name VARCHAR(255), last_name VARCHAR(255), username VARCHAR(255), pwd VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Table created");
  });
});


// select employees
app.get("/getusers", (req, res) => {
  const bcrypt = require("bcrypt");
  const sql = "select * from system_users where username = ?";
  const params = [username];
  let query = db.query(sql, params, (err, results) => {
    if (err) {
      callBack(err, false);
    } else {
      if (results.length == 0) {
        res.send("Invalid Username");
      } else {
        var hashedPassword = result[0].pwd;
        var response = bcrypt.compareSync(password, hashedPassword);

        if (response == false) {
          res.send("Password Verification failed");
        } else {
          res.send(results);
        }
      }
    }
    res.send(results);
  });
});


//update employee
app.get("/updateemployee/:id", (req, res) => {
  let newName = "Updated name";
  let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.get("/deleteemployee/:id", (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee deleted");
  });
});