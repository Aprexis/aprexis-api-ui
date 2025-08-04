import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PharmacyStoreRouting } from "./pharmacy_store.routing.js"
import { NoMatch } from "..@aprexis/aprexis-api-utility"
import { PharmacyStoresPage } from "../../pages/pharmacy_stores/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class PharmacyStoresRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyStoresPrefix = pathHelper.pluralPrefix(window.location, "pharmacy-stores")

    return (
      <Switch>
        <Route
          exact
          path={pharmacyStoresPrefix}
          render={(props) => (<PharmacyStoresPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyStoresPrefix}/:pharmacy_store_id`}
          render={(props) => (<PharmacyStoreRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyStoresRouting }
