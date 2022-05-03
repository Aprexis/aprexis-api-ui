import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { LabTestValueProfilePage } from "../../pages/lab_test_values"
import { pathHelper, valueHelper } from "../../../helpers"

class LabTestValueRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const labTestPrefix = pathHelper.singularPrefix(window.location, "lab-test-values", ":lab_test_value_id")

    return (
      <Switch>
        <Route
          exact
          path={`${labTestPrefix}/profile`}
          render={(props) => (<LabTestValueProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { LabTestValueRouting }
