import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
//import { LoadProviderRouting } from "."
import { NoMatch } from "../.."
import { LoadProvidersPage } from "../../../pages/admin/load_providers"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers"

class LoadProvidersRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const loadProvidersPrefix = pathHelper.pluralPrefix(window.location, "load-providers")

    return (
      <Switch>
        <Route
          exact
          path={loadProvidersPrefix}
          render={(props) => (<LoadProvidersPage {...props} {...contextProps} />)}
        />
        {/*
        <Route
          path={`${loadProvidersPrefix}/:load_provider_id`}
          render={(props) => (<LoadProviderRouting {...props} {...contextProps} />)}
        />
    */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { LoadProvidersRouting }
