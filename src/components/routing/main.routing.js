import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "./"
import { HealthPlansRouting } from "./health_plans"
import { PharmacyChainsRouting } from "./pharmacy_chains"
import { UsersRouting } from "./users"
import { DashboardPage, HomePage } from "../pages"

class MainRouting extends Component {
  render() {
    const { context, currentUser } = this.props

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (<HomePage {...props} context={context} currentUser={currentUser} />)}
        />
        <Route
          exact
          path="/dashboard"
          render={(props) => (<DashboardPage {...props} context={context} currentUser={currentUser} />)}
        />
        <Route
          path="/health-plans"
          render={(props) => (<HealthPlansRouting {...props} context={context} currentUser={currentUser} />)}
        />
        <Route
          path="/pharmacy-chains"
          render={(props) => (<PharmacyChainsRouting {...props} context={context} currentUser={currentUser} />)}
        />
        <Route
          path="/users"
          render={(props) => (<UsersRouting {...props} context={context} currentUser={currentUser} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MainRouting }
