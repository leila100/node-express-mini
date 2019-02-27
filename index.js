const express = require("express")
const db = require("./data/db")

const server = express()
const PORT = 8080

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ err: err }))
})

server.listen(PORT, () => {
  console.log("Server is listening on port ", PORT)
})
