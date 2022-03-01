import fs from "fs"
import express from "express"
import { fileURLToPath } from "url"
import { join, dirname } from "path"
import uniqid from "uniqid"

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
)

const authorsRouter = express.Router()

authorsRouter.post("/", (req, resp) => {
  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() }
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  authorsArray.push(newAuthor)
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))
  resp.status(201).send({ id: authorsArray.id })
})

authorsRouter.get("/", (req, resp) => {
  const fileContent = fs.readFileSync(authorsJSONPath)
  const authorsArray = JSON.parse(fileContent)
  resp.send(authorsArray)
})

authorsRouter.get("/:authorId", (req, resp) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  const getAuthor = authorsArray.find((a) => a.id === req.params.authorId)
  resp.send(getAuthor)
})

authorsRouter.delete("/:authorId", (req, resp) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  const remAuthors = authorsArray.filter((a) => a.id !== req.params.authorId)
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remAuthors))
  resp.status(204).send()
})

export default authorsRouter
