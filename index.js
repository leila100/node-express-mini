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
        .status(500) // 500: Server Error
        .json({ error: "The users information could not be retrieved." })
    )
})

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.status(400).json({ errorMessage: "The id has to be a number" }) // 400: Bad Request
  } else {
    db.findById(id)
      .then(user => {
        if (user) res.json(user)
        else
          res
            .status(404) // 404: Not Found
            .json({ message: "The user with the specified ID does not exist." })
      })
      .catch(err =>
        res
          .status(500) // 500: Server Error
          .json({ error: "The user information could not be retrieved." })
      )
  }
})

server.post("/api/users", (req, res) => {
  const userInfo = req.body

  if (userInfo.name && userInfo.bio) {
    db.insert(userInfo)
      .then(({ id }) => {
        db.findById(id)
          .then(user => {
            res.status(201).json(user)
          }) // 201: Created
          .catch(err =>
            res
              .status(500) // 500: Server Error
              .json({ error: "The user information could not be retrieved." })
          )
      })
      .catch(err =>
        res
          .status(500) // 500: Server Error
          .json({
            error: "There was an error while saving the user to the database"
          })
      )
  } else {
    res
      .status(400) // 400: Bad Request
      .json({ errorMessage: "Please provide name and bio for the user." })
  }
})

server.listen(PORT, () => {
  console.log("Server is listening on port ", PORT)
})
