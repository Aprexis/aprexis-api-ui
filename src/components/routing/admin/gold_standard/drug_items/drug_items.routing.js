import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DrugItemRouting } from "./drug_item.routing"
import { NoMatch } from "../../.."
import { DrugItemsPage } from "../../../../pages/admin/gold_standard/drug_items"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class DrugItemsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const drugItemsPrefix = pathHelper.pluralPrefix(window.location, "drug-items")

    return (
      <Switch>
        <Route
          exact
          path={drugItemsPrefix}
          render={(props) => (<DrugItemsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${drugItemsPrefix}/:drug_item_id`}
          render={(props) => (<DrugItemRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DrugItemsRouting }
