import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DiagnosisCodesRouting } from "../diagnosis_codes/index.js"
import { NoMatch } from "../../index.js"
import { DiseaseProfilePage } from "../../../pages/admin/diseases/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

class DiseaseRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const diseasePrefix = pathHelper.singularPrefix(window.location, "diseases", ":disease_id")

    return (
      <Switch>
        <Route
          path={`${diseasePrefix}/diagnosis-codes`}
          render={(props) => (<DiagnosisCodesRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${diseasePrefix}/profile`}
          render={(props) => (<DiseaseProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DiseaseRouting }
