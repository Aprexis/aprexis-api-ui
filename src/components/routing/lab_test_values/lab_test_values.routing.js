import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { LabTestValueRouting } from "./"
import { NoMatch } from "../"
import { LabTestValuesPage } from "../../pages/lab_test_values"
import { pathHelper, valueHelper } from "../../../helpers"

class LabTestValuesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const labTestValuesPrefix = pathHelper.pluralPrefix(window.location, "lab-test-values")

    return (
      <Switch>
        <Route
          exact
          path={labTestValuesPrefix}
          render={(props) => (<LabTestValuesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${labTestValuesPrefix}/:lab_test_value_id`}
          render={(props) => (<LabTestValueRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { LabTestValuesRouting }
