import { AbstractPageViewModel } from "../"
import { interventionApi } from "../../../../api"
import { userCredentialsHelper } from "../../../../helpers"

class InterventionProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const intervention_id = pathEntries['interventions'].value
    interventionApi.profile(
      userCredentials,
      intervention_id,
      (intervention) => { this.addField('intervention', intervention, this.redrawView) },
      this.onError
    )
  }
}

export { InterventionProfilePageViewModel }
