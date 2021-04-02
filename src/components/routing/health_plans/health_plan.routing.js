import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NoMatch } from '../'
import { HealthPlanPatientSearchAlgorithmsPage, HealthPlanProfilePage } from '../../pages/health_plans'

class HealthPlanRouting extends Component {
  render() {
    const { context, currentUser } = this.props

    return (
      <Switch>
        <Route
          exact
          path='/health-plans/:health_plan_id/patient-search-algorithms'
          render={
            (props) => (
              <HealthPlanPatientSearchAlgorithmsPage
                {...props}
                context={context} currentUser={currentUser}
              />
            )
          }
        />
        <Route
          exact
          path='/health-plans/:health_plan_id/profile'
          render={(props) => (<HealthPlanProfilePage {...props} context={context} currentUser={currentUser} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanRouting }
