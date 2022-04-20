import express from "express"
import createError from "http-errors"
import UsersModel from "./model.js"
import { generateAccessToken } from "../../auth/tools.js"

const usersRouter = express.Router()

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UsersModel(req.body)
    const { _id } = await newUser.save()
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

export default usersRouter
