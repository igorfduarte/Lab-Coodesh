const mongoose = require("mongoose");

const CronSchema = mongoose.Schema({
date:{
    type:Date
}
});

module.exports = mongoose.model("Cron", CronSchema);
