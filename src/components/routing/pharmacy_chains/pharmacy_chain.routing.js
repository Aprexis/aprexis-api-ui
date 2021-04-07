import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { PharmacyChainProfilePage } from "../../pages/pharmacy_chains"

class PharmacyChainRouting extends Component {
  render() {
    const { context, currentUser } = this.props

    return (
      <Switch>
        <Route
          exact
          path="/pharmacy-chains/:pharmacy_chain_id/profile"
          render={(props) => (<PharmacyChainProfilePage {...props} context={context} currentUser={currentUser} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyChainRouting }
