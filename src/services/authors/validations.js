import { body } from "express-validator"

export const newAuthorValidation = [
  body("name").exists().withMessage("Name required"),
  body("surname").exists().withMessage("Surname required"),
  body("email").exists().withMessage("Email required"),
]
