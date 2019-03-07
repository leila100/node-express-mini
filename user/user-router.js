const express = require("express")
const User = require("./userDb")

const router = express.Router()

router.get("/", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err =>
      res
        .status(500) // 500: Server Error
        .json({ error: "The users information could not be retrieved." })
    )
})

router.get("/:id", (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.status(400).json({ errorMessage: "The id has to be a number" }) // 400: Bad Request
  } else {
    User.findById(id)
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

router.post("/", (req, res) => {
  const userInfo = req.body

  if (userInfo.name && userInfo.bio) {
    User.insert(userInfo)
      .then(({ id }) => {
        User.findById(id)
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

router.put("/:id", (req, res) => {
  const { id } = req.params
  const userInfo = req.body
  if (isNaN(id)) {
    res.status(400).json({ errorMessage: "The id has to be a number" }) // 400: Bad Request
  } else if (userInfo.name && userInfo.bio) {
    User.update(id, userInfo)
      .then(response => {
        User.findById(id)
          .then(user => {
            // 200: OK
            if (user) res.status(200).json(user)
            else
              res
                .status(404) // 404: Not Found
                .json({
                  message: "The user with the specified ID does not exist."
                })
          })
          .catch(err =>
            res
              .status(500) // 500: Server Error
              .json({ error: "The user information could not be retrieved." })
          )
      })
      .catch(err =>
        res
          .status(500) // 500: Server Error
          .json({ error: "The user information could not be modified." })
      )
  } else {
    res
      .status(400) // 400: Bad Request
      .json({ errorMessage: "Please provide name and bio for the user." })
  }
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.status(400).json({ errorMessage: "The id has to be a number" }) // 400: Bad Request
  } else {
    //Retrieve the user info before deleting it
    let deletedUser = {}
    User.findById(id)
      .then(user => {
        if (user) deletedUser = user
        else {
          res
            .status(404) // 404: Not Found
            .json({ message: "The user with the specified ID does not exist." })
        }
      })
      .catch(err =>
        res
          .status(500) // 500: Server Error
          .json({ error: "The user information could not be retrieved." })
      )

    User.remove(id)
      .then(response => {
        if (response) {
          res.status(200).json(deletedUser) // 200: OK
        } else {
          res
            .status(404) // 404: Not Found
            .json({ message: "The user with the specified ID does not exist." })
        }
      })
      .catch(err =>
        res
          .status(500) // 500: Server Error
          .json({ error: "The user could not be removed" })
      )
  }
})

module.exports = router
