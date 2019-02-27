import React from "react"

import { UserWrapper } from "../styles/UserStyles"

const User = props => {
  return (
    <UserWrapper>
      <div>
        <span>Username:</span> {props.user.name}{" "}
      </div>
      <div>
        <span>User Bio:</span> {props.user.bio}{" "}
      </div>
    </UserWrapper>
  )
}

export default User
