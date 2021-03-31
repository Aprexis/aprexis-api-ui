import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { UserRouting } from './'
import { NoMatch } from '../'
import { UsersPage } from '../../pages/users'

class UsersRouting extends Component {
  render() {
    const { context, currentUser } = this.props

    return (
      <Switch>
        <Route
          exact
          path='/users'
          render={(props) => (<UsersPage {...props} context={context} currentUser={currentUser} />)}
        />
        <Route
          path='/users/:user_id'
          render={(props) => (<UserRouting {...props} context={context} currentUser={currentUser} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { UsersRouting }
