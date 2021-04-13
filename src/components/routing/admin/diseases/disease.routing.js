import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DiagnosisCodesRouting } from "../diagnosis_codes"
import { NoMatch } from "../../"
import { DiseaseProfilePage } from "../../../pages/admin/diseases"
import { pathHelper } from "../../../../helpers"

class DiseaseRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
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
