const DBService = require("./db");
const JSONStream = require("JSONStream");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello World => express");
});

app.get("/engineer", async (req, res) => {
  const stream = await DBService.getAllEngineer();
  res.set("Content-Type", "application/json");
  stream.pipe(JSONStream.stringify()).pipe(res);
});

let server;
module.exports = {
  async start(port) {
    server = app.listen(port, "0.0.0.0", () =>
      console.info(`App express on port ${port}`)
    );
  },
  async stop() {
    return new Promise((resolve, reject) => {
      server.close(async () => resolve);
    });
  },
};
