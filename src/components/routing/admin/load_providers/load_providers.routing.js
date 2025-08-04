import { Component } from "react"
import { Route, Switch } from "react-router-dom"
//import { LoadProviderRouting } from "./load_provider.routing.js"
import { NoMatch } from "../../index.js"
import { LoadProvidersPage } from "../../../pages/admin/load_providers/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers/index.js"

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
