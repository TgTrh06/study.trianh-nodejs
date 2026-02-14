import { Router } from "express";
import { AppDataSource } from "../models/DataSource";
import { Author } from "../models/entities/Author.entity";
import AuthorController from "../controllers/author.controller";

const router = Router();

// FORM CREATE
router.get("/create", AuthorController.getCreateForm);

// CREATE
router.post("/create", AuthorController.createAuthor);

// GET ALL
router.get("/", AuthorController.getAllAuthors);

export default router;