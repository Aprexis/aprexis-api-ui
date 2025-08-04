import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../../index.js"
import { MappedConceptsPage } from "../../../../pages/admin/gold_standard/therapeutic_concepts/index.js"
import { MarketedProductsRouting } from "../marketed_products/index.js"
import { SpecificProductProfilePage } from "../../../../pages/admin/gold_standard/specific_products/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers/index.js"

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
          path={`${specificProductPrefix}/mapped-concepts`}
          render={(props) => (<MappedConceptsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${specificProductPrefix}/marketed-products`}
          render={(props) => (<MarketedProductsRouting {...props} {...contextProps} />)}
        />
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
