const express = require("express")
const db = require("./data/db")

const server = express()
const PORT = 8080

server.use(express.json())

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.json(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    )
})

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.status(500).json({ error: "The id has to be a number" })
  } else {
    db.findById(id)
      .then(user => {
        if (user) res.json(user)
        else
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The user information could not be retrieved." })
      )
  }
})

server.listen(PORT, () => {
  console.log("Server is listening on port ", PORT)
})
