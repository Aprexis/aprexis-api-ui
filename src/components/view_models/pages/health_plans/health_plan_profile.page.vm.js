import { AbstractPageViewModel } from '../'
import { healthPlanApi } from '../../../../api'
import { userCredentialsHelper } from '../../../../helpers'

class HealthPlanProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const health_plan_id = pathEntries['health-plans'].value
    healthPlanApi.show(userCredentials, health_plan_id, (healthPlan) => { this.addField('healthPlan', healthPlan, this.redraw) }, this.onError)
  }
}

export { HealthPlanProfilePageViewModel }
