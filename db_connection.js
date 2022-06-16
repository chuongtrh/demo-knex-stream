const knex = require("knex");

function createConnection(connection) {
  let dbConnection = knex({
    client: "pg",
    connection,
    acquireConnectionTimeout: 60000,
    pool: {
      min: 5,
      max: 40,
      propagateCreateError: false,
      acquireTimeoutMillis: 60000,
    },
  });

  //check connection
  dbConnection
    .raw("select 1+1 as result")
    .then((result) => {
      console.info("Db successfully connected");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  return dbConnection;
}

let db;

(async () => {
  if (!db) {
    db = createConnection({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    });
  }
})();

async function closeConnectionDB() {
  if (db) {
    await db.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        console.info("close db connection");
      }
    });
  }
}

module.exports = { db, closeConnectionDB };
