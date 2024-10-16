import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { ProductsRouting } from "../products"
import { NoMatch } from "../../.."
import { MarketedProductProfilePage } from "../../../../pages/admin/gold_standard/marketed_products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class MarketedProductRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const marketedProductPrefix = pathHelper.singularPrefix(window.location, "marketed-products", ":marketed_product_id")

    return (
      <Switch>
        <Route
          path={`${marketedProductPrefix}/products`}
          render={(props) => (<ProductsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${marketedProductPrefix}/profile`}
          render={(props) => (<MarketedProductProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MarketedProductRouting }
