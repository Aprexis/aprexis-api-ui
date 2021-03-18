import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NoMatch, UserRouting } from './'
import { UsersPage } from '../pages/users'

class UsersRouting extends Component {
  render() {
    // Get the path prefix

    return (
      <Switch>
        <Route path='/users' component={UsersPage} />
        <Route path='/users/:user_id' component={UserRouting} />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { UsersRouting }
