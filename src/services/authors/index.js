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

authorsRouter.post("/", (req, res) => {
  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() }
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  authorsArray.push(newAuthor)
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))
  res.status(201).send({ id: authorsArray.id })
})

authorsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(authorsJSONPath)
  const authorsArray = JSON.parse(fileContent)
  res.send(authorsArray)
})

authorsRouter.get("/:authorId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  const getAuthor = authorsArray.find((item) => item.id === req.params.authorId)
  res.send(getAuthor)
})

authorsRouter.delete("/:authorId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  const remAuthors = authorsArray.filter(
    (item) => item.id !== req.params.authorId
  )
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remAuthors))
  res.status(204).send()
})

authorsRouter.put("/:authorId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  const index = authorsArray.findIndex((item) => {
    return item.id === req.params.authorId
  })
  if (index === -1) res.status(404).send()
  const originAuthor = authorsArray[index]
  const updatedAuthor = { ...originAuthor, ...req.body, updatedAt: new Date() }
  authorsArray[index] = updatedAuthor
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))
  res.send(updatedAuthor)
})

export default authorsRouter
