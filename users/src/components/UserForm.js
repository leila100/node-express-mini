import React, { Component } from "react"
import axios from "axios"
import Zoom from "react-reveal/Zoom"

import { Form, Button } from "../styles/formStyles"

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {
        name: "",
        bio: ""
      }
    }
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    if (id) this.getUser(id)
  }

  getUser = id => {
    const endpoint = `http://localhost:8080/api/users/${id}`
    axios
      .get(endpoint)
      .then(response => {
        this.setState({ userInfo: response.data })
      })
      .catch(err => console.log(err))
  }

  saveInput = event => {
    const newInfo = { ...this.state.userInfo }
    newInfo[event.target.name] = event.target.value
    this.setState({ userInfo: newInfo })
  }

  action = event => {
    event.preventDefault()
    if (this.props.actionType === "Add")
      this.props.addUser(this.state.userInfo, this.props.history)
    else if (this.props.actionType === "Update")
      this.props.updateUser(
        this.state.userInfo,
        this.props.match.params.id,
        this.props.history
      )
  }

  render() {
    return (
      <Zoom>
        <h1>Add a new user</h1>
        <Form onSubmit={this.action}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.userInfo.name}
            onChange={this.saveInput}
          />
          <textarea
            name="bio"
            rows="5"
            placeholder="Bio"
            value={this.state.userInfo.bio}
            onChange={this.saveInput}
          />
          <Button color="primary">{this.props.actionType} User</Button>
        </Form>
      </Zoom>
    )
  }
}

export default UserForm
