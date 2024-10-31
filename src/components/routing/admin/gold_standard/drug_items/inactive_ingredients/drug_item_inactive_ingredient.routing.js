import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../../.."
import { DrugItemInactiveIngredientProfilePage } from "../../../../../pages/admin/gold_standard/drug_items/inactive_ingredients"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../../helpers"

class DrugItemInactiveIngredientRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const drugItemInactiveIngredientPrefix = pathHelper.singularPrefix(window.location, "drug-item-inactive-ingredients", ":drug_item_inactive_ingredient_id")

    return (
      <Switch>
        <Route
          exact
          path={`${drugItemInactiveIngredientPrefix}/profile`}
          render={(props) => (<DrugItemInactiveIngredientProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DrugItemInactiveIngredientRouting }
