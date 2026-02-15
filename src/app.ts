import express from "express";
import path from "path";
import WebRoute from "./routers/web.route";

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// middleware to serve static files
app.use(express.static(path.join(__dirname, "../public")));

// middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Send form data

// routes
app.use(WebRoute);

export default app;