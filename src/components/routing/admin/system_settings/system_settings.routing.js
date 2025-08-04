import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { SystemSettingRouting } from "./system_setting.routing.js"
import { NoMatch } from "../../index.js"
import { SystemSettingsPage } from "../../../pages/admin/system_settings/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

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
