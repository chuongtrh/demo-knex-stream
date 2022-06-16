const DBService = require("./db");
const JSONStream = require("JSONStream");

const server = require("fastify")({
  bodyLimit: 5 * 1024 * 1024,
});

// server.register(require("@fastify/cors"), {});

server.get("/hello", (req, rep) => {
  rep.send("Hello World => fastify");
});

server.get("/engineer", async (req, rep) => {
  const stream = await DBService.getAllEngineer();
  rep.hijack();
  stream.pipe(JSONStream.stringify()).pipe(rep.raw);
});

module.exports = {
  async start(port) {
    await server.register(require("@fastify/express"));
    server.use(require("cors")());

    await server.listen({ port, host: "0.0.0.0" });
    console.info(`App fastify on port ${port}`);
  },
  async stop() {
    return server.close();
  },
};
