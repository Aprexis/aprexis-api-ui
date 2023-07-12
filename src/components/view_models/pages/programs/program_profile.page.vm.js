import { AbstractPageViewModel } from '../'
import { programApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, userCredentialsHelper } from '../../../../helpers'

class ProgramProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const health_plan_id = pathEntries['programs'].value
    programApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      health_plan_id,
      (program) => { this.addField('program', program, this.redrawView) },
      this.onError
    )
  }
}

export { ProgramProfilePageViewModel }
