import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NoMatch } from '../'
import { UserProfilePage } from '../../pages/users'

class UserRouting extends Component {
  render() {
    const { context, currentUser } = this.props

    return (
      <Switch>
        <Route
          exact
          path='/users/:user_id/profile'
          render={(props) => (<UserProfilePage {...props} context={context} currentUser={currentUser} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { UserRouting }
