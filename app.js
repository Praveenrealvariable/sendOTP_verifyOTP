import express from "express";
import bodyParser from "body-parser";
import morgan from 'morgan';
import cors from "cors";
import config from 'config';
import connectDb from './database/db.js';
import routes from './routes/routes.js';
const port = config.get("SERVER_PORT") || 8080

const app = express();
console.log("env =", config.get("env").toString());

//db connection
connectDb();

//middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
    })
);
app.options("*", cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.send("<h3>Server working fine.</h3>");
});
app.use("/api", routes);



//not found error handler
app.use(function (req, res, next) {
    res.status(404).send("Sorry, can't find that!")
  })

// Error handler 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
  
    res.status(statusCode).json({
      errorStatus:true,
      message: message,
    });
  });

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});