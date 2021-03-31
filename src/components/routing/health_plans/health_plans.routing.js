import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
//import { HealthPlanRouting } from './'
import { NoMatch } from '../'
import { HealthPlansPage } from '../../pages/health_plans'

class HealthPlansRouting extends Component {
  render() {
    const { context, currentUser } = this.props

    return (
      <Switch>
        <Route
          exact
          path='/health-plans'
          render={(props) => (<HealthPlansPage {...props} context={context} currentUser={currentUser} />)}
        />
        {/*
        <Route
          path='/health-plans/:health_plan_id'
          render={(props) => (<HealthPlanRouting {...props} context={context} currentHealthPlan={currentUser} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlansRouting }
