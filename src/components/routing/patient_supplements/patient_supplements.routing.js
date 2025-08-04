import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PatientSupplementRouting } from "./patient_supplement.routing.js"
import { NoMatch } from "../index.js"
import { PatientSupplementsPage } from "../../pages/patient_supplements/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class PatientSupplementsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientSupplementsPrefix = pathHelper.pluralPrefix(window.location, "patient-supplements")

    return (
      <Switch>
        <Route
          exact
          path={patientSupplementsPrefix}
          render={(props) => (<PatientSupplementsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientSupplementsPrefix}/:patient_supplement_id`}
          render={(props) => (<PatientSupplementRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientSupplementsRouting }
