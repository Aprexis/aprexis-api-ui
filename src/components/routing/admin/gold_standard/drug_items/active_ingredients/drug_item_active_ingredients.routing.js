import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DrugItemActiveIngredientRouting } from "./drug_item_active_ingredient.routing"
import { NoMatch } from "../../../.."
import { DrugItemActiveIngredientsPage } from "../../../../../pages/admin/gold_standard/drug_items/active_ingredients"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../../helpers"

class DrugItemActiveIngredientsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const drugItemActiveIngredientsPrefix = pathHelper.pluralPrefix(window.location, "drug-item-active-ingredients")

    return (
      <Switch>
        <Route
          exact
          path={drugItemActiveIngredientsPrefix}
          render={(props) => (<DrugItemActiveIngredientsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${drugItemActiveIngredientsPrefix}/:drug_item_active_ingredient_id`}
          render={(props) => (<DrugItemActiveIngredientRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DrugItemActiveIngredientsRouting }
