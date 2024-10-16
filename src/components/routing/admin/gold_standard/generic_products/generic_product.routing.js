import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../.."
import { GenericProductProfilePage } from "../../../../pages/admin/gold_standard/generic_products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class GenericProductRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const genericProductPrefix = pathHelper.singularPrefix(window.location, "generic-products", ":generic_product_id")

    return (
      <Switch>
        <Route
          exact
          path={`${genericProductPrefix}/profile`}
          render={(props) => (<GenericProductProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { GenericProductRouting }
