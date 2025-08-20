import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../.."
import { TherapeuticConceptRouting } from "./therapeutic_concept.routing"
import { TherapeuticConceptsPage } from "../../../../pages/admin/gold_standard/therapeutic_concepts"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class TherapeuticConceptsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const therapeuticConceptsPrefix = pathHelper.pluralPrefix(window.location, "therapeutic-concepts")

    return (
      <Switch>
        <Route
          exact
          path={therapeuticConceptsPrefix}
          render={(props) => (<TherapeuticConceptsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${therapeuticConceptsPrefix}/:therapeutic_concept_id`}
          render={(props) => (<TherapeuticConceptRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { TherapeuticConceptsRouting }
