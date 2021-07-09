import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { CaregiverRouting } from "./"
import { NoMatch } from "../"
import { CaregiversPage } from "../../pages/caregivers"
import { pathHelper, valueHelper } from "../../../helpers"

class CaregiversRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const CaregiversPrefix = pathHelper.pluralPrefix(window.location, "caregivers")

    return (
      <Switch>
        <Route
          exact
          path={CaregiversPrefix}
          render={(props) => (<CaregiversPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${CaregiversPrefix}/:caregiver_id`}
          render={(props) => (<CaregiverRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { CaregiversRouting }
