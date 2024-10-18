import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../.."
import {
  ChildConceptsPage,
  ParentConceptsPage,
  TherapeuticConceptProfilePage
} from "../../../../pages/admin/gold_standard/therapeutic_concepts"
import { SpecificProductsPage } from "../../../../pages/admin/gold_standard/specific_products"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class TherapeuticConceptRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const therapeuticConceptPrefix = pathHelper.singularPrefix(window.location, "therapeutic-concepts", ":therapeutic_concept_id")

    return (
      <Switch>
        <Route
          exact
          path={`${therapeuticConceptPrefix}/profile`}
          render={(props) => (<TherapeuticConceptProfilePage {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${therapeuticConceptPrefix}/child-concepts`}
          render={(props) => (<ChildConceptsPage {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${therapeuticConceptPrefix}/parent-concepts`}
          render={(props) => (<ParentConceptsPage {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${therapeuticConceptPrefix}/specific-products`}
          render={(props) => (<SpecificProductsPage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { TherapeuticConceptRouting }
