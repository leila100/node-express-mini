import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import axios from "axios"

import Navbar from "./components/Navbar"
import UsersList from "./containers/UsersList"
import UserForm from "./components/UserForm"

class App extends Component {
  state = {
    users: [],
    currentUser: {}
  }

  componentDidMount = () => {
    this.fetchUsers()
  }

  fetchUsers = () => {
    const endpoint = "https://api-users-leila.herokuapp.com/api/users"
    axios
      .get(endpoint)
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(err => console.log(err))
  }

  deleteHandler = userId => {
    const endpoint = `https://api-users-leila.herokuapp.com/api/users/${userId}`
    axios
      .delete(endpoint)
      .then(response => {
        this.fetchUsers()
      })
      .catch(err => console.log(err))
  }

  addUserHandler = (user, history) => {
    const endpoint = "https://api-users-leila.herokuapp.com/api/users"
    axios
      .post(endpoint, user)
      .then(response => {
        this.fetchUsers()
        history.push("/")
      })
      .catch(err => console.log(err))
  }

  updateUserHandler = (user, id, history) => {
    const endpoint = `https://api-users-leila.herokuapp.com/api/users/${id}`
    axios
      .put(endpoint, user)
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
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <UsersList
                {...props}
                users={this.state.users}
                delete={this.deleteHandler}
              />
            )}
            key="home"
          />
          <Route
            exact
            path="/add"
            render={props => (
              <UserForm
                {...props}
                users={this.state.users}
                actionType="Add"
                addUser={this.addUserHandler}
              />
            )}
            key="add"
          />
          <Route
            path="/update/:id"
            render={props => (
              <UserForm
                {...props}
                users={this.state.users}
                actionType="Update"
                updateUser={this.updateUserHandler}
              />
            )}
            key="update"
          />
        </Switch>
      </div>
    )
  }
}

export default App
