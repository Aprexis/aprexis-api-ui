import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { SpecificProductsRouting } from "../specific_products"
import { NoMatch } from "../../.."
import { SpecificDrugProductProfilePage } from "../../../../pages/admin/gold_standard/specific_drug_products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class SpecificDrugProductRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const specificDrugProductPrefix = pathHelper.singularPrefix(window.location, "specific-drug-products", ":specific_drug_product_id")

    return (
      <Switch>
        <Route
          exact
          path={`${specificDrugProductPrefix}/profile`}
          render={(props) => (<SpecificDrugProductProfilePage {...props} {...contextProps} />)}
        />
        <Route
          path={`${specificDrugProductPrefix}/specific-products`}
          render={(props) => (<SpecificProductsRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { SpecificDrugProductRouting }
