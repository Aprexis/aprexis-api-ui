import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NoMatch } from './'
import { UserPage } from '../pages/users'

class UserRouting extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/users/:user_id' component={UserPage} />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { UserRouting }
