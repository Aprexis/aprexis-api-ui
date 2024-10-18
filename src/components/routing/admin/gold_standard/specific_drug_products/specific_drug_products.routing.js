import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { SpecificDrugProductRouting } from "./specific_drug_product.routing"
import { NoMatch } from "../../.."
import { SpecificDrugProductsPage } from "../../../../pages/admin/gold_standard/specific_drug_products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class SpecificDrugProductsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const specificDrugProductsPrefix = pathHelper.pluralPrefix(window.location, "specific-drug-products")

    return (
      <Switch>
        <Route
          exact
          path={specificDrugProductsPrefix}
          render={(props) => (<SpecificDrugProductsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${specificDrugProductsPrefix}/:specific_drug_product_id`}
          render={(props) => (<SpecificDrugProductRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { SpecificDrugProductsRouting }
