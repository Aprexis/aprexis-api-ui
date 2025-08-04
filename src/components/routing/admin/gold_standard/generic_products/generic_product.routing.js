import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { SpecificDrugProductsRouting } from "../specific_drug_products/index.js"
import { NoMatch } from "../../../index.js"
import { GenericProductProfilePage } from "../../../../pages/admin/gold_standard/generic_products/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers/index.js"

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
          path={`${genericProductPrefix}/specific-drug-products`}
          render={(props) => (<SpecificDrugProductsRouting {...props} {...contextProps} />)}
        />
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
