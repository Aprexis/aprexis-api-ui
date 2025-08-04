import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../index.js"
import { LabTestProfilePage } from "../../../pages/admin/lab_tests/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers/index.js"

class LabTestRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const labTestPrefix = pathHelper.singularPrefix(window.location, "lab-tests", ":lab_test_id")

    return (
      <Switch>
        <Route
          exact
          path={`${labTestPrefix}/profile`}
          render={(props) => (<LabTestProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { LabTestRouting }
