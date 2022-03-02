import fs from "fs"
import express from "express"
import { fileURLToPath } from "url"
import { join, dirname } from "path"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { newPostValidation } from "./validations.js"

const postsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "posts.json"
)

const postsRouter = express.Router()

const getPosts = () => JSON.parse(fs.readFileSync(postsJSONPath))
const writePosts = (content) =>
  fs.writeFileSync(postsJSONPath, JSON.stringify(content))

postsRouter.post("/", newPostValidation, (req, res, next) => {
  try {
    const errorsList = validationResult(req)
    if (errorsList.isEmpty()) {
      const newPost = {
        ...req.body,
        createdAt: new Date(),
        id: uniqid(),
      }
      const postsArray = getPosts()
      postsArray.push(newPost)
      writePosts(postsArray)
      res.status(201).send({ id: newPost.id })
    } else {
      res.status(400).send({ message: "post did not pass validation" })
    }
  } catch (error) {
    res.send({ message: "error occured post" })
  }
})

postsRouter.get("/", (req, res, next) => {
  try {
    const postsArray = getPosts()
    console.log("hello get")
    res.send(postsArray)
  } catch (error) {
    res.send({ message: "error occured get" })
  }
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
