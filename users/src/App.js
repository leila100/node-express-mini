import React, { Component } from "react"
import { Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import UsersList from "./containers/UsersList"

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route path="/" component={UsersList} />
      </div>
    )
  }
}

export default App
