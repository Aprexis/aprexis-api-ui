import { AbstractPageViewModel } from "../abstract.page.vm.js"
import { pharmacyChainApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

class PharmacyChainProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const pharmacy_chain_id = pathHelper.pathEntryValue(pathEntries, 'pharmacy-chains')
    pharmacyChainApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      pharmacy_chain_id,
      (pharmacyChain) => { this.addField('pharmacyChain', pharmacyChain, this.redrawView) },
      this.onError
    )
  }
}

export { PharmacyChainProfilePageViewModel }
