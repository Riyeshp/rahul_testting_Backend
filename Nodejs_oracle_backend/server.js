let connection;
var oracledb = require("oracledb");

(async function() {
  try {
    connection = await oracledb.getConnection({
      user: "scoot",
      password: "MyPassword",
      connectString: "localhost:1521/xe"
    });
    console.log("Successfully connected to Oracle!");
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    if (connection) {
      try {
        await connection.execute(
          `SELECT *
        FROM EMP`,
          [],
          function(err, result) {
            if (err) {
              console.error(err.message);
              return;
            }
            console.log(result.rows);
          }
        );
      } catch (err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
})();
