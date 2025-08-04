import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { ProductRouting } from "./product.routing.js"
import { NoMatch } from "../../../index.js"
import { ProductsPage } from "../../../../pages/admin/gold_standard/products/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers/index.js"

class ProductsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const productsPrefix = pathHelper.pluralPrefix(window.location, "products")

    return (
      <Switch>
        <Route
          exact
          path={productsPrefix}
          render={(props) => (<ProductsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${productsPrefix}/:product_id`}
          render={(props) => (<ProductRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { ProductsRouting }
