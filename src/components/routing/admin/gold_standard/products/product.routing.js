import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DrugItemsRouting } from "../drug_items/index.js"
import { PackagesRouting } from "../packages/index.js"
import { NoMatch } from "../../../index.js"
import { ProductProfilePage } from "../../../../pages/admin/gold_standard/products/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers/index.js"

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
          path={`${productPrefix}/drug-items`}
          render={(props) => (<DrugItemsRouting {...props} {...contextProps} />)}
        />
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
