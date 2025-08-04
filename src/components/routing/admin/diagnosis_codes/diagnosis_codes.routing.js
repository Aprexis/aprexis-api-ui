import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DiagnosisCodeRouting } from "./diagnosis_code.routing.js"
import { NoMatch } from "../../index.js"
import { DiagnosisCodesPage } from "../../../pages/admin/diagnosis_codes/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers/index.js"

class DiagnosisCodesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const diagnosisCodePrefix = pathHelper.pluralPrefix(window.location, "diagnosis-codes")

    return (
      <Switch>
        <Route
          exact
          path={diagnosisCodePrefix}
          render={(props) => (<DiagnosisCodesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${diagnosisCodePrefix}/:diagnosis_code_id`}
          render={(props) => (<DiagnosisCodeRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DiagnosisCodesRouting }
