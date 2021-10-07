import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { DocumentProfilePage } from "../../pages/documents"
import { pathHelper, valueHelper } from "../../../helpers"

class DocumentRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const medicalClaimPrefix = pathHelper.singularPrefix(window.location, "documents", ":document_id")

    return (
      <Switch>
        <Route
          exact
          path={`${medicalClaimPrefix}/profile`}
          render={(props) => (<DocumentProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DocumentRouting }
