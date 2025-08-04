import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { CaregiverRouting } from "./caregiver.routing.js"
import { NoMatch } from "../index.js"
import { CaregiversPage } from "../../pages/caregivers/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

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
