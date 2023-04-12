const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DB connect successfully!");
  } catch (error) {
    console.log("DB connect fail!");
    console.log(error);
  }
}
module.exports = { connect };
