const express = require("express");
const rateLimit = require("express");
const { protect } = require("./middlewares/auth");
const errorHandler = require("./middlewares/error");
require("dotenv").config();
//import security packages
const hpp = require("hpp");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const ExpressMongoSanitize = require("express-mongo-sanitize");
//import routes
const APIRouter = require("./routes/API");
const productsRouter = require("./routes/productsRouter");

const app = express();
app.use(express.json());


//prevent request overflow
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10min
  max: 100,
});

//security middlewares
if(process.env.NODE_ENV !== "test")
  app.use(protect)

app.use(limiter)
app.use(hpp())
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(ExpressMongoSanitize())

//mount Routes
app.use("/", APIRouter);
app.use("/products", productsRouter);

app.get('/test',(req,res)=>{
    res.status(200).end()
})

app.use(errorHandler);

module.exports = app;