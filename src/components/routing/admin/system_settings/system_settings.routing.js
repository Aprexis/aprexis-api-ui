import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { SystemSettingRouting } from "."
import { NoMatch } from "../.."
import { SystemSettingsPage } from "../../../pages/admin/system_settings"
import { pathHelper, valueHelper } from "../../../../helpers"

class SystemSettingsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const settingsPrefix = pathHelper.pluralPrefix(window.location, "settings")

    return (
      <Switch>
        <Route
          exact
          path={settingsPrefix}
          render={(props) => (<SystemSettingsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${settingsPrefix}/:setting_id`}
          render={(props) => (<SystemSettingRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { SystemSettingsRouting }
