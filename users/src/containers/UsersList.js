import React, { Component } from "react"
import axios from "axios"
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap"

import User from "../components/User"
import { UsersWrapper } from "../styles/UserStyles"

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      modal: false,
      userId: "",
      username: ""
    }
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

  toggle = (id, name) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      userId: id,
      username: name
    }))
  }

  deleteHandler = () => {
    const endpoint = `http://localhost:8080/api/users/${this.state.userId}`
    axios
      .delete(endpoint)
      .then(response => {
        this.fetchUsers()
      })
      .catch(err => console.log(err))
    this.toggle()
  }

  render() {
    return (
      <>
        <UsersWrapper>
          {this.state.users.map(user => (
            <User user={user} key={user.id} toggle={this.toggle} />
          ))}
        </UsersWrapper>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="sm"
          centered={true}
        >
          <ModalHeader toggle={this.toggle}>
            Delete {this.state.username}?
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteHandler}>
              Delete
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default UsersList
