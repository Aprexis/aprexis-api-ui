import { AbstractPageViewModel } from '../'
import { healthPlanProgramReportApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, userCredentialsHelper } from '../../../../helpers'

class HealthPlanProgramReportProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const health_plan_program_report_id = pathEntries['health-plan-program-reports'].value
    healthPlanProgramReportApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      health_plan_program_report_id,
      (healthPlanProgramReport) => { this.addField('healthPlanProgramReport', healthPlanProgramReport, this.redrawView) },
      this.onError
    )
  }
}

export { HealthPlanProgramReportProfilePageViewModel }
