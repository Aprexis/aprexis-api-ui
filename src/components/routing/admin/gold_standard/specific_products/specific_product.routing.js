import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../.."
import { SpecificProductProfilePage } from "../../../../pages/admin/gold_standard/specific_products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class SpecificProductRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const specificProductPrefix = pathHelper.singularPrefix(window.location, "specific-products", ":specific_product_id")

    return (
      <Switch>
        <Route
          exact
          path={`${specificProductPrefix}/profile`}
          render={(props) => (<SpecificProductProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { SpecificProductRouting }
