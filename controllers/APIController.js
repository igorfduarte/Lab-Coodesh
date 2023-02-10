const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Cron = require("../models/cronModel");

exports.GetAPIDetails = asyncHandler(async (req, res) => {
  //check db state
  let dbState = "";  
  if (mongoose.connection.readyState === 0) dbState = "Database disconnected";
  else dbState = "Database connected";

  //get time of last time CRON was run
  const cron = await Cron.findOne();

  //get uptime
  const uptime = process.uptime();
  const time = `${Math.floor(uptime / (24 * 60 * 60))}days ${Math.floor(
    uptime / (24 * 60)
  )} hours and ${Math.floor(uptime / 60)} minutes`;

  //memoryUsage
  const memoryUsage = process.memoryUsage()

  res.status(200).json({ success: true, dbState: dbState, CRONlastTimeRrun: cron.date, processUptime: time,memoryUsage:memoryUsage });
});
