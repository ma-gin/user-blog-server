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

authorsRouter.post("/", (req, response) => {
  console.log("body:", req.body)
  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() }
  console.log(newAuthor)
  //   const authorsArray = JSON.parse(req.body)
  response.send({ message: "hi mom" })
})

authorsRouter.get("/", (request, resp) => {
  const fileContent = fs.readFileSync(authorsJSONPath)
  const authorsArray = JSON.parse(fileContent)
  resp.send(authorsArray)
})

export default authorsRouter
