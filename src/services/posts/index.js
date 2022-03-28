import fs from "fs"
import express from "express"
import { fileURLToPath } from "url"
import { join, dirname } from "path"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { newPostValidation } from "./validations.js"
import { authorFindById } from "../authors/index.js"
// import post from "./model.js"

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

postsRouter.get("/", async (req, res, next) => {
  try {
    const postsArray = getPosts()
    const postsArrayWithAuthors = postsArray.map((post) => ({
      ...post,
      author: authorFindById(post.author),
    }))
    res.send(postsArrayWithAuthors)
  } catch (error) {
    res.send({ message: "error occured get" })
  }
})

postsRouter.get("/:postId", (req, res, next) => {
  try {
    const postId = req.params.postId
    const postsArray = getPosts()
    const post = postsArray.find((item) => item.id === postId)
    if (!post) res.status(404).send({ message: `post ${postId} not found` })
    res.send(post)
  } catch (error) {
    res.send({ message: "error occured get id" })
  }
})

postsRouter.delete("/:postId", (req, res, next) => {
  try {
    console.log("hey delete")
    const postId = req.params.postId
    const postsArray = getPosts()
    const remPosts = postsArray.filter((item) => item.id !== postId)
    console.log(remPosts)
    writePosts(remPosts)
    res.send({ message: `post ${postId} deleted successfully` })
  } catch (error) {
    res.send({ message: "error occured delete" })
  }
})

postsRouter.put("/:postId", newPostValidation, (req, res, next) => {
  try {
    const errorsList = validationResult(req)
    if (errorsList.isEmpty()) {
      const postId = req.params.postId
      const postsArray = getPosts()
      const index = postsArray.findIndex((item) => item.id === postId)
      if (index === -1) res.status(404).send({ message: "no such post found" })
      const originalPost = postsArray[index]
      const updatedPost = {
        ...originalPost,
        ...req.body,
        updatedAt: new Date(),
      }
      postsArray[index] = updatedPost
      writePosts(postsArray)
      res.status(201).send(updatedPost)
    } else {
      res.status(400).send({ message: "post did not pass validation" })
    }
  } catch (error) {
    res.send({ message: "error occured put" })
  }
})

export default postsRouter
