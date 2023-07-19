import { AbstractPageViewModel } from "../../"
import { billingContractTermApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../helpers"

class BillingContractTermProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editPatientModal = this.editPatientModal.bind(this)
    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  editPatientModal(billingContractTermToEdit, patientType) {
    billingContractTermApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      billingContractTermToEdit.id,
      (billingContractTerm) => {
        this.props.launchModal(
          "billing-contract-term-patient",
          { operation: "update", patientType, onUpdateView: this.refreshData, billingContractTerm })
      },
      this.onError
    )
  }

  editProfileModal(billingContractTermToEdit) {
    billingContractTermApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      billingContractTermToEdit.id,
      (billingContractTerm) => {
        this.props.launchModal(
          "billing-contract-term-profile",
          { operation: "update", onUpdateView: this.refreshData, billingContractTerm })
      },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const billing_contract_pharmacy_id = pathEntries["billing-contract-terms"].value
    billingContractTermApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      billing_contract_pharmacy_id,
      (billingContractTerm) => {
        this.addField("billingContractTerm", billingContractTerm, this.redrawView)
      },
      this.onError
    )
  }
}

export { BillingContractTermProfilePageViewModel }
