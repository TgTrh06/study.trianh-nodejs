import express from "express";
import path from "path";
import userRoute from "./routers/user.route";
import authorRoute from "./routers/author.route";
import bookRoute from "./routers/book.route";
import homeRoute from "./routers/web.route";

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
app.use("/", homeRoute);

app.use("/users", userRoute);
app.use("/authors", authorRoute)
app.use("/books", bookRoute)

export default app;