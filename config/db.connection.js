const { knex } = require("knex");

const config = {
  client: "mysql",
  connection: {
    database: "heroku_e1442059138caf3",
    host: "us-cdbr-east-03.cleardb.com",
    port: 3306,
    user: "ba85c24f87f37e",
    password: "f76ac848",
  },
  pool: { min: 1, max: 10 },
};

class ConnectionDb {
  constructor() {
    this.connection = knex(config);
    Object.freeze(this);
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new ConnectionDb().getConnection();
