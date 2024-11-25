const app = require("./app.js");
const mongoose = require("mongoose");
const config = require("./config.js");

const connect = url => {
  return mongoose.connect(url, config.db.options, () => console.log("*Connected to", url));
};

if (require.main === module) {
  app.listen(config.port, () => console.log("*Listening on port " + config.port));
  connect(config.db.prod);
  mongoose.connection.on('error', console.log);
}

module.exports = { connect };

