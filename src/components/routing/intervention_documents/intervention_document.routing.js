import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { InterventionDocumentProfilePage } from "../../pages/intervention_documents"
import { pathHelper, valueHelper } from "../../../helpers"

class InterventionDocumentRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const interventionDocumentPrefix = pathHelper.singularPrefix(window.location, "intervention-documents", ":intervention_document_id")

    return (
      <Switch>
        <Route
          exact
          path={`${interventionDocumentPrefix}/profile`}
          render={(props) => (<InterventionDocumentProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { InterventionDocumentRouting }
