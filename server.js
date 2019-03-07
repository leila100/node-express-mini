const express = require("express")
const cors = require("cors")
const logger = require("morgan")
const helmet = require("helmet")

const userRouter = require("./user/user-router")

const server = express()

server.use(helmet())
server.use(express.json())
server.use(logger("dev"))
server.use(cors())

server.use("/api/users", userRouter)

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Users App")
})

module.exports = server
