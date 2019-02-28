import React, { Component } from "react"

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

  saveInput = event => {
    const newInfo = { ...this.state.userInfo }
    newInfo[event.target.name] = event.target.value
    this.setState({ userInfo: newInfo })
  }

  action = event => {
    event.preventDefault()
    if (this.props.actionType === "Add")
      this.props.addUser(this.state.userInfo, this.props.history)
  }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default UserForm
