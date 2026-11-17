require("dotenv").config({ quiet: true });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = require("./Config/port");
const Database = require("./Config/db");
const IndexRouter = require("./Routers/index");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    next();
});

app.use(IndexRouter);

Database(mongoose);

port(app);