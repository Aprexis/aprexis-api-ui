import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { DocumentsRouting } from "../documents"
import { PatientsRouting } from "../patients"
import { HealthPlanProfilePage } from "../../pages/health_plans"
import { HealthPlanProgramLimitsRouting } from "../health_plan_program_limits"
import { HealthPlanPatientSearchAlgorithmsRouting } from "../health_plan_patient_search_algorithms"
import { ProgramsRouting } from "../programs"
import { BillingClaimsRouting } from "../billing/claims"
import { BillingContractsRouting } from "../billing/contracts"
import { UsersRouting } from "../users"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class HealthPlanRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlanPrefix = pathHelper.singularPrefix(window.location, "health-plans", ":health_plan_id")

    return (
      <Switch>
        <Route
          path={`${healthPlanPrefix}/billing-contracts`}
          render={(props) => (<BillingContractsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanPrefix}/billing-claims`}
          render={(props) => (<BillingClaimsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanPrefix}/documents`}
          render={(props) => (<DocumentsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${healthPlanPrefix}/patient-search-algorithms`}
          render={(props) => (<HealthPlanPatientSearchAlgorithmsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanPrefix}/patients`}
          render={(props) => (<PatientsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanPrefix}/programs`}
          render={(props) => (<ProgramsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanPrefix}/health-plan-program-limits`}
          render={(props) => (<HealthPlanProgramLimitsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${healthPlanPrefix}/profile`}
          render={(props) => (<HealthPlanProfilePage {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanPrefix}/users`}
          render={(props) => (<UsersRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanRouting }
