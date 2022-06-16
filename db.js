const { db } = require("./db_connection");

module.exports = {
  getAllEngineer: async () => {
    const res = db.raw(`SELECT * FROM public.engineer LIMIT 1000`);
    return await res.stream({ batchSize: 1000 });
  },
};
