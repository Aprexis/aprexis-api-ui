import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { MarketedProductRouting } from "./marketed_product.routing"
import { NoMatch } from "../../.."
import { MarketedProductsPage } from "../../../../pages/admin/gold_standard/marketed_products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class MarketedProductsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const marketedProductsPrefix = pathHelper.pluralPrefix(window.location, "marketed-products")

    return (
      <Switch>
        <Route
          exact
          path={marketedProductsPrefix}
          render={(props) => (<MarketedProductsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${marketedProductsPrefix}/:marketed_product_id`}
          render={(props) => (<MarketedProductRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MarketedProductsRouting }
