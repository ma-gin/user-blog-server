import fs from "fs"
import express from "express"
import { fileURLToPath } from "url"
import { join, dirname } from "path"
import uniqid from "uniqid"
// import createHttpError from "http-errors"
// import { validationResult } from "express-validator"
// import { newPostValidation } from "./validation.js"

const postsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "posts.json"
)

const postsRouter = express.Router()

const getPosts = () => JSON.parse(fs.readFileSync(postsJSONPath))
const writePosts = (content) =>
  fs.writeFileSync(booksJSONPath, JSON.stringify(content))

postsRouter.post("/", (req, res) => {
  res.send({ message: "post working" })
})

postsRouter.get("/", (req, res) => {
  res.send({ message: "get working" })
})

postsRouter.get("/:postId", (req, res) => {
  res.send({ message: "get post working" })
})

postsRouter.delete("/:postId", (req, res) => {
  res.send({ message: "delete working" })
})

postsRouter.put("/:postId", (req, res) => {
  res.send({ message: "put working" })
})

export default postsRouter
