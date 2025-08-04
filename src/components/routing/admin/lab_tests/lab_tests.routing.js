import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { LabTestRouting } from "./lab_test.routing,js"
import { NoMatch } from "../../index.js"
import { LabTestsPage } from "../../../pages/admin/lab_tests/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers/index.js"

class LabTestsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const labTestsPrefix = pathHelper.pluralPrefix(window.location, "lab-tests")

    return (
      <Switch>
        <Route
          exact
          path={labTestsPrefix}
          render={(props) => (<LabTestsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${labTestsPrefix}/:lab_test_id`}
          render={(props) => (<LabTestRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { LabTestsRouting }
