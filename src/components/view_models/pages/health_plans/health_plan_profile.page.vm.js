import { AbstractPageViewModel } from '../'
import { healthPlanApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from '../../../../helpers'

class HealthPlanProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const health_plan_id = pathHelper.pathEntryValue(pathEntries, 'health-plans')
    healthPlanApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      health_plan_id,
      (healthPlan) => { this.addField('healthPlan', healthPlan, this.redrawView) },
      this.onError
    )
  }
}

export { HealthPlanProfilePageViewModel }
