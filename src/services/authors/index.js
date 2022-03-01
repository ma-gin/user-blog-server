// GET /authors => returns the list of authors
// GET /authors/123 => returns a single author
// POST /authors => create a new author
// PUT /authors/123 => edit the author with the given id
// DELETE /authors/123 => delete the author with the given id
import fs from "fs"
import express from "express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

console.log(import.meta.url)

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const authorsJSONPath = join(parentFolderPath, "authors.json")

const authorsRouter = express.Router()

authorsRouter.post("/", (request, response) => {
  response.send({ message: "hi mom" })
})
authorsRouter.get("/", (request, response) => {
  const fileContent = fs.readFileSync(authorsJSONPath)
  const authorsArray = JSON.parse(fileContent)
  response.send(authorsArray)
})
export default authorsRouter
