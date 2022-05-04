import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { AnswersRouting } from "../answers"
import { NoMatch } from "../"
import { FaxesRouting } from "../faxes"
import { InterventionDocumentsRouting } from "../intervention_documents"
import { LabTestValuesRouting } from "../lab_test_values"
import { InterventionProfilePage } from "../../pages/interventions"
import { pathHelper, valueHelper } from "../../../helpers"

class InterventionRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const interventionPrefix = pathHelper.singularPrefix(window.location, "interventions", ":intervention_id")

    return (
      <Switch>
        <Route
          path={`${interventionPrefix}/answers`}
          render={(props) => (<AnswersRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${interventionPrefix}/intervention-documents`}
          render={(props) => (<InterventionDocumentsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${interventionPrefix}/faxes`}
          render={(props) => (<FaxesRouting {...props} {...contextProps} />)}
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
