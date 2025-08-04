import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../../index.js"
import { TherapeuticConceptRouting } from "./therapeutic_concept.routing.js"
import { TherapeuticConceptsPage } from "../../../../pages/admin/gold_standard/therapeutic_concepts/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers/index.js"

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

    console.log(``)

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
