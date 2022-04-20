import express from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"
import postsRouter from "./services/posts/index.js"
import cors from "cors"

const server = express()
const { PORT } = process.env || 3001

const corsOrigin = [process.env.PROD, process.env.FE]

server.use(cors())
server.use(express.json())
server.use("/posts", postsRouter)
server.use("/authors", authorsRouter)
// server.use(
//   cors({
//     origin: function (origin, next) {
//       if (!origin || corsOrigin.indexOf(origin !== -1)) {
//         next(null, true)
//       } else {
//         next(new Error("cors error!"))
//       }
//     },
//   })
// )

console.table(listEndpoints(server))

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}. 
Started on ${new Date()}`)
})
