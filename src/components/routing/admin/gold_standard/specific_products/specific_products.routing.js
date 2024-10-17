import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { SpecificProductRouting } from "./specific_product.routing"
import { NoMatch } from "../../.."
import { SpecificProductsPage } from "../../../../pages/admin/gold_standard/specific_products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class SpecificProductsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const specificProductsPrefix = pathHelper.pluralPrefix(window.location, "specific-products")

    return (
      <Switch>
        <Route
          exact
          path={specificProductsPrefix}
          render={(props) => (<SpecificProductsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${specificProductsPrefix}/:specific_product_id`}
          render={(props) => (<SpecificProductRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { SpecificProductsRouting }
