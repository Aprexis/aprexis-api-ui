import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { FaxRouting } from "./"
import { NoMatch } from ".."
import { FaxesPage } from "../../pages/faxes"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class FaxesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const FaxesPrefix = pathHelper.pluralPrefix(window.location, "faxes")

    return (
      <Switch>
        <Route
          exact
          path={FaxesPrefix}
          render={(props) => (<FaxesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${FaxesPrefix}/:fax_id`}
          render={(props) => (<FaxRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { FaxesRouting }
