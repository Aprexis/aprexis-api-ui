import { AbstractPageViewModel } from "../"
import { interventionApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../helpers"

class InterventionVerifyPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.fetchIntervention = this.fetchIntervention.bind(this)
    this.loadData = this.loadData.bind(this)
    this.verifyIntervention = this.verifyIntervention.bind(this)
  }

  fetchIntervention(userCredentials, intervention_id, onSuccess) {
    interventionApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      intervention_id,
      (intervention) => { this.addField('intervention', intervention, onSuccess) },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const intervention_id = pathEntries['interventions'].value
    this.fetchIntervention(
      userCredentials,
      intervention_id,
      () => { this.verifyIntervention(userCredentials, intervention_id, this.redrawView) }
    )
  }

  verifyIntervention(userCredentials, intervention_id, onSuccess) {
    interventionApi.verify(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      intervention_id,
      (verification) => { this.addField('verification', verification, onSuccess) },
      this.onError
    )
  }
}

export { InterventionVerifyPageViewModel }
