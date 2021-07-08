import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { MedicationProfilePage } from "../../../pages/admin/medications"
import { pathHelper, valueHelper } from "../../../../helpers"

class MedicationRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const medicationPrefix = pathHelper.singularPrefix(window.location, "medications", ":medication_id")

    return (
      <Switch>
        <Route
          exact
          path={`${medicationPrefix}/profile`}
          render={(props) => (<MedicationProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MedicationRouting }
