import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../.."
import { DrugItemActiveIngredientsRouting } from "./active_ingredients"
import { DrugItemInactiveIngredientsRouting } from "./inactive_ingredients"
import { DrugItemProfilePage } from "../../../../pages/admin/gold_standard/drug_items"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

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
