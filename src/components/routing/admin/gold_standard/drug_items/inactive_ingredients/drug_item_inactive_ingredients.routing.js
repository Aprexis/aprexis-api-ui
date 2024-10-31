import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DrugItemInactiveIngredientRouting } from "./drug_item_inactive_ingredient.routing"
import { NoMatch } from "../../../.."
import { DrugItemInactiveIngredientsPage } from "../../../../../pages/admin/gold_standard/drug_items/inactive_ingredients"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../../helpers"

class DrugItemInactiveIngredientsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const drugItemInactiveIngredientsPrefix = pathHelper.pluralPrefix(window.location, "drug-item-inactive-ingredients")

    return (
      <Switch>
        <Route
          exact
          path={drugItemInactiveIngredientsPrefix}
          render={(props) => (<DrugItemInactiveIngredientsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${drugItemInactiveIngredientsPrefix}/:drug_item_inactive_ingredient_id`}
          render={(props) => (<DrugItemInactiveIngredientRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DrugItemInactiveIngredientsRouting }
