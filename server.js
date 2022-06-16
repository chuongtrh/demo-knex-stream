let api;
if (process.env.ROUTER_API == "express") {
  api = require("./express");
} else {
  api = require("./fastify");
}
module.exports = {
  async start(port) {
    await api.start(port);
  },
  async stop() {
    await api.stop();
  },
};
