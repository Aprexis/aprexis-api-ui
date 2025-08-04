import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../index.js"
//import { SystemSettingProfilePage } from "../../../pages/admin/system_settings/index.js"
//import { valueHelper } from '@aprexis/@aprexis-api-utility'
//import { pathHelper } from "../../../../helpers/index.js"

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
