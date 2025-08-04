import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../../index.js"
import { DrugItemActiveIngredientsRouting } from "./active_ingredients/index.js"
import { DrugItemInactiveIngredientsRouting } from "./inactive_ingredients/index.js"
import { DrugItemProfilePage } from "../../../../pages/admin/gold_standard/drug_items/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers/index.js"

class DrugItemRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const drugItemPrefix = pathHelper.singularPrefix(window.location, "drug-items", ":drug_item_id")

    return (
      <Switch>
        <Route
          path={`${drugItemPrefix}/drug-item-active-ingredients`}
          render={(props) => (<DrugItemActiveIngredientsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${drugItemPrefix}/drug-item-inactive-ingredients`}
          render={(props) => (<DrugItemInactiveIngredientsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${drugItemPrefix}/profile`}
          render={(props) => (<DrugItemProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DrugItemRouting }
