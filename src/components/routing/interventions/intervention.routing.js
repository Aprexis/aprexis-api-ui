import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { AnswersRouting } from "../answers/index.js"
import { NoMatch } from "../index.js"
import { FaxesRouting } from "../faxes/index.js"
import { InterventionDocumentsRouting } from "../intervention_documents/index.js"
import { LabTestValuesRouting } from "../lab_test_values/index.js"
import { MapTalkingPointsRouting } from "../map_talking_points/index.js"
import { InterventionProfilePage, InterventionVerifyPage } from "../../pages/interventions/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"
import { InterventionMedicationsRouting } from "../intervention_medications/index.js"
import { BillingClaimsRouting } from "../billing/claims/index.js"

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
          path={`${interventionPrefix}/billing-claims`}
          render={(props) => (<BillingClaimsRouting {...props} {...contextProps} />)}
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
          path={`${interventionPrefix}/intervention-medications`}
          render={(props) => (<InterventionMedicationsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${interventionPrefix}/map-talking-points`}
          render={(props) => (<MapTalkingPointsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${interventionPrefix}/profile`}
          render={(props) => (<InterventionProfilePage {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${interventionPrefix}/verify`}
          render={(props) => (<InterventionVerifyPage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { InterventionRouting }
