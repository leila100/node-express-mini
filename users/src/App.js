import React, { Component } from "react"
import { Route } from "react-router-dom"
import axios from "axios"

import Navbar from "./components/Navbar"
import UsersList from "./containers/UsersList"
import UserForm from "./components/UserForm"

class App extends Component {
  state = {
    users: []
  }

  componentDidMount = () => {
    this.fetchUsers()
  }

  fetchUsers = () => {
    const endpoint = "http://localhost:8080/api/users"
    axios
      .get(endpoint)
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(err => console.log(err))
  }

  deleteHandler = userId => {
    const endpoint = `http://localhost:8080/api/users/${userId}`
    axios
      .delete(endpoint)
      .then(response => {
        this.fetchUsers()
      })
      .catch(err => console.log(err))
  }

  addUserHandler = (user, history) => {
    const endpoint = "http://localhost:8080/api/users"
    axios
      .post(endpoint, user)
      .then(response => {
        this.fetchUsers()
        history.push("/")
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Navbar />
        <Route
          exact
          path="/"
          render={() => (
            <UsersList users={this.state.users} delete={this.deleteHandler} />
          )}
        />
        <Route
          path="/add"
          render={props => (
            <UserForm
              {...props}
              users={this.state.users}
              actionType="Add"
              addUser={this.addUserHandler}
            />
          )}
        />
      </div>
    )
  }
}

export default App
