import React from "react"

import { UserWrapper, IconWrapper, Info } from "../styles/UserStyles"

const User = props => {
  return (
    <UserWrapper>
      <Info>
        <span>Username:</span> {props.user.name}
      </Info>
      <Info>
        <span>User Bio:</span> <p>{props.user.bio}</p>
      </Info>
      <IconWrapper>
        <i
          className="fas fa-user-times"
          onClick={() => props.toggle(props.user.id, props.user.name)}
        />
        <i
          className="fas fa-user-edit"
          onClick={() => props.history.push(`/update/${props.user.id}`)}
        />
      </IconWrapper>
    </UserWrapper>
  )
}

export default User
