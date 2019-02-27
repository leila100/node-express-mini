import React, { Component } from "react"
import axios from "axios"

import User from "../components/User"
import { UsersWrapper } from "../styles/UserStyles"

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount = () => {
    const endpoint = "http://localhost:8080/api/users"
    axios
      .get(endpoint)
      .then(response => {
        console.log(response)
        this.setState({ users: response.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <UsersWrapper>
        {this.state.users.map(user => (
          <User user={user} key={user.id} />
        ))}
      </UsersWrapper>
    )
  }
}

export default UsersList
