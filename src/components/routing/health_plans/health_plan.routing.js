import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../index.js"
import { BillingInvoicesRouting } from "../billing/invoices/index.js"
import { DocumentsRouting } from "../documents/index.js"
import { PatientsRouting } from "../patients/index.js"
import { HealthPlanProfilePage } from "../../pages/health_plans/index.js"
import { HealthPlanProgramLimitsRouting } from "../health_plan_program_limits/index.js"
import { HealthPlanProgramReportsRouting } from "../health_plan_program_reports/index.js"
import { HealthPlanPatientSearchAlgorithmsRouting } from "../health_plan_patient_search_algorithms/index.js"
import { ProgramsRouting } from "../programs/index.js"
import { BillingClaimsRouting } from "../billing/claims/index.js"
import { BillingContractsRouting } from "../billing/contracts/index.js"
import { UsersRouting } from "../users/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

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
          path={`${healthPlanPrefix}/billing-invoices`}
          render={(props) => (<BillingInvoicesRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanPrefix}/documents`}
          render={(props) => (<DocumentsRouting {...props} {...contextProps} />)}
        />
        <Route
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
          path={`${healthPlanPrefix}/health-plan-program-reports`}
          render={(props) => (<HealthPlanProgramReportsRouting {...props} {...contextProps} />)}
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
