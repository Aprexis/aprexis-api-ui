import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
//import { LabTestProfilePage } from "../../pages/admin/lab_tests"
//import { pathHelper } from "../../../helpers"

class LabTestRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const labTestPrefix = pathHelper.singularPrefix(window.location, "patients", ":lab_test_id")
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${labTestPrefix}/profile`}
          render={(props) => (<LabTestProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { LabTestRouting }
