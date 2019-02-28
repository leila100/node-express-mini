import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap"

import User from "../components/User"
import { UsersWrapper } from "../styles/UserStyles"

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      userId: "",
      username: ""
    }
  }

  toggle = (id, name) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      userId: id,
      username: name
    }))
  }

  deleteHandler = event => {
    event.preventDefault()
    this.props.delete(this.state.userId)
    this.toggle()
  }

  render() {
    return (
      <>
        <UsersWrapper>
          {this.props.users.map(user => (
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
