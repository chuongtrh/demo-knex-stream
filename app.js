"use strict";
require("dotenv-flow").config();

const { closeConnectionDB } = require("./db_connection");
const server = require("./server");

const start = async () => {
  try {
    await server.start(process.env.PORT);

    console.info(`Server listening on localhost:${process.env.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

const stop = async () => {
  try {
    //Graceful shutdown

    await server.stop();

    await closeConnectionDB();

    console.info("Server stop...");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await stop();
});

process.on("warning", (err) => {
  if (err) {
    console.warn("warning:=>", err);
  }
});

process.on("uncaughtException", (err) => {
  if (err) {
    console.error("uncaughtException:=>", err);
  }
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.warn("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
