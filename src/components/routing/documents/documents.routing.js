import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DocumentRouting } from "./"
import { NoMatch } from ".."
import { DocumentsPage } from "../../pages/documents"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class DocumentsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const DocumentsPrefix = pathHelper.pluralPrefix(window.location, "documents")

    return (
      <Switch>
        <Route
          exact
          path={DocumentsPrefix}
          render={(props) => (<DocumentsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${DocumentsPrefix}/:document_id`}
          render={(props) => (<DocumentRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DocumentsRouting }
