import { AbstractPageViewModel } from "../"
import { pharmacyChainApi } from "../../../../api"
import { userCredentialsHelper } from "../../../../helpers"

class PharmacyChainProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const pharmacy_chain_id = pathEntries['pharmacy-chains'].value
    pharmacyChainApi.show(
      userCredentials,
      pharmacy_chain_id,
      (pharmacyChain) => { this.addField('pharmacyChain', pharmacyChain, this.redraw) },
      this.onError
    )
  }
}

export { PharmacyChainProfilePageViewModel }
