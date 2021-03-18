import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NoMatch, UsersRouting } from './'
import { DashboardPage, HomePage } from '../pages'

class MainRouting extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/dashboard' component={DashboardPage} />
        <Route path='/users' component={UsersRouting} />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MainRouting }
