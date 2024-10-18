import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PackagesRouting } from "../packages"
import { NoMatch } from "../../.."
import { ProductProfilePage } from "../../../../pages/admin/gold_standard/products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class ProductRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const productPrefix = pathHelper.singularPrefix(window.location, "products", ":product_id")

    return (
      <Switch>
        <Route
          path={`${productPrefix}/packages`}
          render={(props) => (<PackagesRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${productPrefix}/profile`}
          render={(props) => (<ProductProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { ProductRouting }
