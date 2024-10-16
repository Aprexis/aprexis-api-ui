import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { GenericProductRouting } from "./generic_product.routing"
import { NoMatch } from "../../.."
import { GenericProductsPage } from "../../../../pages/admin/gold_standard/generic_products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class GenericProductsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const genericProductsPrefix = pathHelper.pluralPrefix(window.location, "generic-products")

    return (
      <Switch>
        <Route
          exact
          path={genericProductsPrefix}
          render={(props) => (<GenericProductsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${genericProductsPrefix}/:generic_product_id`}
          render={(props) => (<GenericProductRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { GenericProductsRouting }
