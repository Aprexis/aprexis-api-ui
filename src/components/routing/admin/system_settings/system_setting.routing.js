import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../.."
//import { SystemSettingProfilePage } from "../../../pages/admin/system_settings"
//import { pathHelper, valueHelper } from "../../../../helpers"

class SystemSettingRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const settingPrefix = pathHelper.singularPrefix(window.location, "settings", ":setting_id")
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${settingPrefix}/profile`}
          render={(props) => (<SettingProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { SystemSettingRouting }
