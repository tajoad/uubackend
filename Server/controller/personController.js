const displayPerson = async (req, res, next) => {
  try {
    var db = req.db;
    let sql = `SELECT * FROM persons WHERE userid = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    });
  } catch (error) {
    res.send({
      message: "An error occured",
    });
  }
};

const createPerson = async (req, res, next) => {
  try {
    //await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req.file.originalname}`)
    // res.status(201).send('Image uploaded succesfully')
    var db = req.db;
    let userData = req.body;
    console.log(userData);
    const params = [
      userData.userid,
      userData.LastName,
      userData.FirstName,
      userData.Email,
      userData.Age,
      userData.PhoneNumber,
      userData.address,
      userData.country,
      userData.state,
      userData.sector,
      userData.Degree,
      userData.Institution,
      userData.edAddDetails,
      userData.Organization,
      userData.Duration,
      userData.exAddDetails,
      req.file.filename,
    ];
    const sql = `insert into persons (userid,
                                            LastName,
                                            FirstName,	
                                            Email,
                                            Age,
                                            PhoneNumber,
                                            address,
                                            country,
                                            state,	
                                            sector,	
                                            Degree,
                                            Institution,	
                                            edAddDetails,
                                            Organization,
                                            Duration,
                                            exAddDetails,
                                            imageName
                                            ) 
                                    VALUES("${params[0]}", 
                                    "${params[1]}", 
                                    "${params[2]}", 
                                    "${params[3]}", 
                                    "${params[4]}",
                                    "${params[5]}",
                                    "${params[6]}",
                                    "${params[7]}",
                                    "${params[8]}",
                                    "${params[9]}",
                                    "${params[10]}",
                                    "${params[11]}",
                                    "${params[12]}",
                                    "${params[13]}",
                                    "${params[14]}",
                                    "${params[15]}",
                                    "${params[16]}"
                                    )`;
    let results = db.query(sql, function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        res.send({
          status: 1,
          messgae: "successfully created profile",
          data: rows,
        });
      }
    });
  } catch (error) {
    res.send({
      message: "An error occured",
    });
  }
};

module.exports = { displayPerson, createPerson };
