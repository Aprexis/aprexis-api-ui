import { AbstractPageViewModel } from "../../../abstract.page.vm.js"
import { goldStandardTherapeuticConceptApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class TherapeuticConceptProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const therapeutic_concept_id = pathHelper.pathEntryValue(pathEntries, "therapeutic-concepts")

    goldStandardTherapeuticConceptApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      therapeutic_concept_id,
      (therapeuticConcept) => { this.addField("therapeuticConcept", therapeuticConcept, this.redrawView) },
      this.onError
    )
  }
}

export { TherapeuticConceptProfilePageViewModel }
