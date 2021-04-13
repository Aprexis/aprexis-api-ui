import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { InterventionsRouting } from "../interventions"
import { PharmacyStoreProfilePage } from "../../pages/pharmacy_stores"
import { pathHelper } from "../../../helpers"

class PharmacyStoreRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const pharmacyStorePrefix = pathHelper.singularPrefix(window.location, "pharmacy-stores", ":pharmacy_store_id")

    return (
      <Switch>
        <Route
          path={`${pharmacyStorePrefix}/interventions`}
          render={(props) => (<InterventionsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${pharmacyStorePrefix}/profile`}
          render={(props) => (<PharmacyStoreProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyStoreRouting }
