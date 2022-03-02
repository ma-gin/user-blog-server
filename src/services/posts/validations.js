import { body } from "express-validator"

export const newPostValidation = [
  body("title").exists().withMessage("Title required"),
  body("category").exists().withMessage("Please select category"),
  body("content").exists().withMessage("Content cannot be empty"),
]
