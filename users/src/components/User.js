import React from "react"

import { UserWrapper, IconWrapper, Info } from "../styles/UserStyles"

const User = props => {
  return (
    <UserWrapper>
      <Info>
        <span>Username:</span> {props.user.name}{" "}
      </Info>
      <Info>
        <span>User Bio:</span> {props.user.bio}{" "}
      </Info>
      <IconWrapper>
        <i
          className="fas fa-user-times"
          onClick={() => props.toggle(props.user.id, props.user.name)}
        />
        <i className="fas fa-user-edit" />
      </IconWrapper>
    </UserWrapper>
  )
}

export default User
