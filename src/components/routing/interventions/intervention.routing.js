import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { AnswersRouting } from "./"
import { NoMatch } from "../"
import { LabTestValuesRouting } from "../lab_test_values"
import { InterventionProfilePage } from "../../pages/interventions"
import { pathHelper } from "../../../helpers"

class InterventionRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const interventionPrefix = pathHelper.singularPrefix(window.location, "interventions", ":intervention_id")

    return (
      <Switch>
        <Route
          path={`${interventionPrefix}/answers`}
          render={(props) => (<AnswersRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${interventionPrefix}/lab-test-values`}
          render={(props) => (<LabTestValuesRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${interventionPrefix}/profile`}
          render={(props) => (<InterventionProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { InterventionRouting }
