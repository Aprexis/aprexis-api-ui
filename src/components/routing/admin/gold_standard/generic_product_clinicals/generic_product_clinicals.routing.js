import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { GenericProductClinicalRouting } from "./generic_product_clinical.routing"
import { NoMatch } from "../../.."
import { GenericProductClinicalsPage } from "../../../../pages/admin/gold_standard/generic_product_clinicals"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class GenericProductClinicalsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const genericProductClinicalsPrefix = pathHelper.pluralPrefix(window.location, "generic-product-clinicals")

    return (
      <Switch>
        <Route
          exact
          path={genericProductClinicalsPrefix}
          render={(props) => (<GenericProductClinicalsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${genericProductClinicalsPrefix}/:generic_product_clinical_id`}
          render={(props) => (<GenericProductClinicalRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { GenericProductClinicalsRouting }
