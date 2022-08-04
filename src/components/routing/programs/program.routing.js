import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { InterventionsRouting } from "../interventions"
//import { ProgramProfilePage } from "../../pages/programs"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class ProgramRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const programPrefix = pathHelper.singularPrefix(window.location, "programs", ":program_id")

    return (
      <Switch>
        <Route
          path={`${programPrefix}/interventions`}
          render={(props) => (<InterventionsRouting {...props} {...contextProps} />)}
        />
        {/*
        <Route
          exact
          path={`${programPrefix}/profile`}
          render={(props) => (<ProgramProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { ProgramRouting }
