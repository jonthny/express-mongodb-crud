import express from "express";

import { create } from "express-handlebars";

import indexRouter from "./routes/index.routes";

import path from "path";

import morgan from "morgan";

const app = express();

app.set("views", path.join(__dirname, "views"));

app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    // partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);

app.set("view engine", ".hbs");

// Midleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(indexRouter);

export default app;
