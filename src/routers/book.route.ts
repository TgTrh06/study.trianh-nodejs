import { Router } from "express";
import { AppDataSource } from "../models/DataSource";
import { Author } from "../models/entities/Author.entity";
import { Book } from "../models/entities/Book.entity";
import BookController from "../controllers/book.controller";


const router = Router();

// FORM CREATE
router.get("/create", BookController.getCreateForm);

// CREATE
router.post("/create", BookController.createBook);

// GET ALL
router.get("/", BookController.getAllBooks);

// DELETE
router.delete("/delete/:id", BookController.deleteBook);

export default router;