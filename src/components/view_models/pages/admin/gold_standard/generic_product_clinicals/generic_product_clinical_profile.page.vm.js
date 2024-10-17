import { AbstractPageViewModel } from "../../.."
import { goldStandardGenericProductClinicalApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../../helpers"

class GenericProductClinicalProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const generic_product_clinical_id = pathEntries["generic-product-clinicals"].value

    goldStandardGenericProductClinicalApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      generic_product_clinical_id,
      (genericProductClinical) => { this.addField("genericProductClinical", genericProductClinical, this.redrawView) },
      this.onError
    )
  }
}

export { GenericProductClinicalProfilePageViewModel }
