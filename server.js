const http = require("http");
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
//const seed = require("./seeder");
const CronJob = require("cron").CronJob;
const Cron = require("./models/cronModel");

const port = process.env.PORT || 5000;
const server = http.createServer(app);


async function startServer() {
  await connectDB();

  var job = new CronJob("0 0 0 * * *", async function () {
    console.log("running a task every day at 00:00");
    const cron = await Cron.findOne();
    cron.date = Date.now();
    cron.save();
    seed()
  });
  job.start();
  server.listen(port, console.log(`Server running on port ${port}`));
}

startServer();
