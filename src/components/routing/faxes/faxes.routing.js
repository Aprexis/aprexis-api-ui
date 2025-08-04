import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { FaxRouting } from "./fax.routing.js"
import { NoMatch } from "../index.js"
import { FaxesPage } from "../../pages/faxes/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class FaxesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const FaxesPrefix = pathHelper.pluralPrefix(window.location, "faxes")

    return (
      <Switch>
        <Route
          exact
          path={FaxesPrefix}
          render={(props) => (<FaxesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${FaxesPrefix}/:fax_id`}
          render={(props) => (<FaxRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { FaxesRouting }
