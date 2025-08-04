import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PatientDiseaseRouting } from "./patient_disease.routing.js"
import { NoMatch } from "../index.js"
import { PatientDiseasesPage } from "../../pages/patient_diseases/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class PatientDiseasesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientDiseasesPrefix = pathHelper.pluralPrefix(window.location, "patient-diseases")

    return (
      <Switch>
        <Route
          exact
          path={patientDiseasesPrefix}
          render={(props) => (<PatientDiseasesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientDiseasesPrefix}/:patient_disease_id`}
          render={(props) => (<PatientDiseaseRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientDiseasesRouting }
