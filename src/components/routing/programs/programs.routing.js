import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { ProgramRouting } from "./"
import { NoMatch } from "../"
import { ProgramsPage } from "../../pages/programs"
import { pathHelper } from "../../../helpers"

class ProgramsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const programsPrefix = pathHelper.pluralPrefix(window.location, "programs")

    return (
      <Switch>
        <Route
          exact
          path={programsPrefix}
          render={(props) => (<ProgramsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${programsPrefix}/:program_id`}
          render={(props) => (<ProgramRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { ProgramsRouting }
