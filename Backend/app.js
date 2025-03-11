const ENV = process.env.NODE_ENV || "production";
require("dotenv").config({ path: `.env.${ENV}` });

//External Modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Local Modules
const errorController = require("./controllers/errorController");
const blogRouter = require("./routers/blogRouter");
const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@abnb.f0nhy.mongodb.net/${process.env.MONGO_DB_DATABASE}`;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", blogRouter);
app.use(errorController.get404);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
