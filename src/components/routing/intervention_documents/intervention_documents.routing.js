import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { InterventionDocumentRouting } from "./"
import { NoMatch } from "../"
import { InterventionDocumentsPage } from "../../pages/intervention_documents"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class InterventionDocumentsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const interventionDocumentsPrefix = pathHelper.pluralPrefix(window.location, "intervention-documents")

    return (
      <Switch>
        <Route
          exact
          path={interventionDocumentsPrefix}
          render={(props) => (<InterventionDocumentsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${interventionDocumentsPrefix}/:intervention_document_id`}
          render={(props) => (<InterventionDocumentRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { InterventionDocumentsRouting }
