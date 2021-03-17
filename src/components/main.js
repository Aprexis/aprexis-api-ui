import React, { Component } from 'react'
import { userCredentialsHelper, valueHelper } from '../helpers'

class Main extends Component {
  render() {
    const userCredentials = userCredentialsHelper.get()

    return (
      <div>
        {!valueHelper.isValue(userCredentials) && <span>Not logged in</span>}
        {valueHelper.isValue(userCredentials) && <span>Logged in at {userCredentials.username} </span>}
      </div>
    )
  }
}

export { Main }
