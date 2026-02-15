import { Router } from "express";
import { HomeController } from "../controllers/home.controller";
import UserRoute from "./user.route";
import BookRoute from "./book.route";
import AuthorRoute from "./author.route";

const router: Router = Router();

router.get("/", HomeController.showHome);
router.post("/", HomeController.submitCity);

router.use("/users", UserRoute);
router.use("/books", BookRoute);
router.use("/authors", AuthorRoute);

export default router;