import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
//import { AppointmentRouting } from "./"
import { NoMatch } from "../"
import { AppointmentsPage } from "../../pages/appointments"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper, } from "../../../helpers"

class AppointmentsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const appointmentsPrefix = pathHelper.pluralPrefix(window.location, "appointments")

    return (
      <Switch>
        <Route
          exact
          path={appointmentsPrefix}
          render={(props) => (<AppointmentsPage {...props} {...contextProps} />)}
        />
        {/*}
        <Route
          path={`${appointmentsPrefix}/:appointment_id`}
          render={(props) => (<AppointmentRouting {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { AppointmentsRouting }
