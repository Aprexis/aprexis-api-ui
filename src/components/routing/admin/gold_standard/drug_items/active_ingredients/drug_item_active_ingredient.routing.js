import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../../../index.js"
import { DrugItemActiveIngredientProfilePage } from "../../../../../pages/admin/gold_standard/drug_items/active_ingredients/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../../helpers/index.js"

class DrugItemActiveIngredientRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const drugItemActiveIngredientPrefix = pathHelper.singularPrefix(window.location, "drug-item-active-ingredients", ":drug_item_active_ingredient_id")

    return (
      <Switch>
        <Route
          exact
          path={`${drugItemActiveIngredientPrefix}/profile`}
          render={(props) => (<DrugItemActiveIngredientProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DrugItemActiveIngredientRouting }
