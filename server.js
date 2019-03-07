const express = require("express")
const cors = require("cors")
const userRouter = require("./user/user-router")

const server = express()

server.use(express.json())
server.use(cors())

server.use("/api/users", userRouter)

module.exports = server
