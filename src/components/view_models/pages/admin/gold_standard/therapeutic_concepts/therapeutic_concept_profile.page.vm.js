import { AbstractPageViewModel } from "../../../"
import { goldStandardTherapeuticConceptApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../../helpers"

class TherapeuticConceptProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const therapeutic_concept_id = pathEntries["therapeutic-concepts"].value

    goldStandardTherapeuticConceptApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      therapeutic_concept_id,
      (therapeuticConcept) => { this.addField("therapeuticConcept", therapeuticConcept, this.redrawView) },
      this.onError
    )
  }
}

export { TherapeuticConceptProfilePageViewModel }
