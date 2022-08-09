import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from ".."
//import { FaxProfilePage } from "../../pages/faxes"
//import { valueHelper } from '@aprexis/aprexis-api-utility'
//import { pathHelper } from "../../../helpers"

class FaxRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const faxPrefix = pathHelper.singularPrefix(window.location, "faxes", ":fax_id")
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${faxPrefix}/profile`}
          render={(props) => (<FaxProfilePage {...props} {...contextProps} />)}
        />
    */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { FaxRouting }
