import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { LabTestValueRouting } from "./lab_test_value.routing.js"
import { NoMatch } from "../index.js"
import { LabTestValuesPage } from "../../pages/lab_test_values/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

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
