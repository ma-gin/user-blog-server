import { body } from "express-validator"

export const newPostValidation = [
  body("author").exists().withMessage("Please select author"),
  body("title").exists().withMessage("Title required"),
  body("category").exists().withMessage("Please select category"),
  body("content").exists().withMessage("Content cannot be empty"),
  body("cover").exists().withMessage("Add picture or nobody will read it"),
]
