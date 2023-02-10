const path = require("path");
const fs = require("fs");
const zlib = require("node:zlib");
const lineReader = require("line-reader");
const https = require("https");
const axios = require("axios");
const productFIle = require("./array.json");
const Product = require("./models/productModel");
const dotenv = require("dotenv");

let obj,
  productsList = [];
const outputPath = path.resolve(__dirname, "./output.json");
const resultPath = path.resolve(__dirname, "./array.json");

dotenv.config();

async function seed() {
  await Product.deleteMany();
  console.log("Data Destroyed...");
  //get filenames
  try {
    const response = await axios.get("https://challenges.coode.sh/food/data/json/index.txt");
    obj = response.data.toString().split("\n");
  } catch (error) {
    console.log(error.response.body);
  }

  //download files
  for (let i = 0; i < obj.length - 1; i++) {
    const file = fs.createWriteStream(obj[i]);
    https.get(`https://challenges.coode.sh/food/data/json/${obj[i]}`, function (response) {
      response.pipe(file);

      file.on("finish", async () => {
        file.close();
        console.log(obj[i], " Download Completed");

        var unzip = zlib.createUnzip();
        var fs = require("fs");
        var out = fs.createWriteStream("output.json");
        var inp = fs.createReadStream(`./${obj[i]}`);
        inp.pipe(unzip).pipe(out);

        lineReader.eachLine(outputPath, async (line, last, cb) => {
          try {
            productsList.push(JSON.parse(line));
          } catch {}

          if (productsList.length >= 100) {
            fs.writeFileSync(resultPath, JSON.stringify(productsList));
            productsList = []
            cb(false);
          } else {
            cb();
          }
        });
        try {
          await Product.insertMany(productFIle);
          console.log("Data Imported to database");
        } catch (error) {
          console.error(error);
        }
      });
    });
  }
}

module.exports = seed;
