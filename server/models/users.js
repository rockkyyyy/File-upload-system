const config = require('../config/config.js');
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
db.connect((err)=>{
    if (err) {
        console.error('Error connecting to the database', err);
        return;
      }
    console.log('Connected to the database');
});

exports.insertData = (data, callback) => {
    const { name, age, mobile, email, city } = data;
  
    // Get the current number of rows in the "userData" table
    const countQuery = 'SELECT COUNT(*) AS rowCount FROM userData';
    db.query(countQuery, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      const rowCount = results[0].rowCount;
      const userId = `USR${String(rowCount + 1).padStart(5, '0')}`;
      const insertQuery = `
        INSERT INTO userData (UserId, Name, Age, Mobile, Email, City)
        VALUES ('${userId}', '${name}', ${age}, '${mobile}', '${email}', '${city}')
      `;
  
      db.query(insertQuery, callback);
      console.log("Data inserted successfully");
    });
  };

exports.USRID = (callback) => {
    const countQuery = 'SELECT COUNT(*) AS rowCount FROM userData';
    db.query(countQuery, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      const rowCount = results[0].rowCount;
      const userId = `USR${String(rowCount + 1).padStart(5, '0')}`;
      callback(null, userId);
    });
};
/*



, , , ,
*/