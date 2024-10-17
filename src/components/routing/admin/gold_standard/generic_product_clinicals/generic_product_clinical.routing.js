import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { GenericProductsRouting } from '../generic_products'
import { NoMatch } from "../../.."
import { GenericProductClinicalProfilePage } from "../../../../pages/admin/gold_standard/generic_product_clinicals"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class GenericProductClinicalRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const genericProductClinicalPrefix = pathHelper.singularPrefix(window.location, "generic-product-clinicals", ":generic_product_clinical_id")

    return (
      <Switch>
        <Route
          path={`${genericProductClinicalPrefix}/generic-products`}
          render={(props) => (<GenericProductsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${genericProductClinicalPrefix}/profile`}
          render={(props) => (<GenericProductClinicalProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { GenericProductClinicalRouting }
