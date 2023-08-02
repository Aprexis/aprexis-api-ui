import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingClaimHistoryCollectionsRouting } from "../billing/claim_history_collections"
import { ConditionMedicationsRouting } from "./condition_medications"
import { DiagnosisCodesRouting } from "./diagnosis_codes"
import { DiseasesRouting } from "./diseases"
import { LabTestsRouting } from "./lab_tests"
import { LoadProvidersRouting } from "./load_providers"
import { MedicationsRouting } from "./medications"
import { NoMatch } from "../"
import { PhysiciansRouting } from "./physicians"
import { SystemSettingsRouting } from "./system_settings"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class AdminRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const adminPrefix = pathHelper.pluralPrefix(window.location, "admin")

    return (
      <Switch>
        <Route
          path={`${adminPrefix}/billing-claim-history-collections`}
          render={(props) => (<BillingClaimHistoryCollectionsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/condition-medications`}
          render={(props) => (<ConditionMedicationsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/diagnosis-codes`}
          render={(props) => (<DiagnosisCodesRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/diseases`}
          render={(props) => (<DiseasesRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/lab-tests`}
          render={(props) => (<LabTestsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/load-providers`}
          render={(props) => (<LoadProvidersRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/medications`}
          render={(props) => (<MedicationsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/physicians`}
          render={(props) => (<PhysiciansRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/system-settings`}
          render={(props) => (<SystemSettingsRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { AdminRouting }
