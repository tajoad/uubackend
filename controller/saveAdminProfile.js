const getAdmin = async (req, res, next) => {
  try {
    var db = req.db;
    let sql = `SELECT * FROM adminuser WHERE id = ${req.params.id}`;
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

const updateAdmin = async (req, res, next) => {
  // try {
  //await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req.file.originalname}`)
  // res.status(201).send('Image uploaded succesfully')
  var db = req.db;
  let userData = req.body;
  console.log(userData);
  const params = [userData.userid, userData.PhoneNumber, userData.sector];

  const sendData = (newImageName) => {
    const sql = `update adminuser
                 set PhoneNumber =  "${params[1]}",
                     sector      =  "${params[2]}",
                     imageName   =  "${newImageName}"
                 where id        =  "${params[0]}"
                 `;
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
    /* } catch (error) {
    res.send({
      message: "An error occured",
    });
  }*/
  };

  if (req.file == undefined) {
    var db = req.db;
    let sql = `SELECT imageName FROM adminuser WHERE id = ${params[0]}`;
    let query = db.query(sql, (err, results) => {
      if (err) {
        throw err;
      }

      sendData(results[0].imageName);
    });
  } else {
    sendData(req.file.filename);
  }
};

module.exports = { getAdmin, updateAdmin };
