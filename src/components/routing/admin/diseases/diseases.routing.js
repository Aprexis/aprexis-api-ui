import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DiseaseRouting } from "./"
import { NoMatch } from "../../"
import { DiseasesPage } from "../../../pages/admin/diseases"
import { pathHelper, valueHelper } from "../../../../helpers"

class DiseasesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const diseasesPrefix = pathHelper.pluralPrefix(window.location, "diseases")

    return (
      <Switch>
        <Route
          exact
          path={diseasesPrefix}
          render={(props) => (<DiseasesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${diseasesPrefix}/:disease_id`}
          render={(props) => (<DiseaseRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DiseasesRouting }
