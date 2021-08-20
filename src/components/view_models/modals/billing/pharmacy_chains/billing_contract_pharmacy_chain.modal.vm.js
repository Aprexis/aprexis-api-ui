import { AbstractModalViewModel } from "../../"
import { pharmacyChainApi } from "../../../../../api"
import { billingContractPharmacyChainApi } from "../../../../../api/billing"
import { userCredentialsHelper, jsEventHelper, valueHelper } from "../../../../../helpers"
import { billingContractPharmacyChainHelper } from "../../../../../helpers/billing"

const billingContractPharmacyChainRequiredFields = {
  contract_id: { label: "Contract", testMethod: valueHelper.isNumberValue },
  pharmacy_id: { label: "Pharmacy Chain", testMethod: valueHelper.isNumberValue }
}

class BillingContractPharmacyChainModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.create = this.create.bind(this)
    this.fetchPharmacyChain = this.fetchPharmacyChain.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectPharmacyChain = this.selectPharmacyChain.bind(this)
    this.update = this.update.bind(this)
  }

  api() {
    return billingContractPharmacyChainApi
  }

  create(modalChangedModel) {
    billingContractPharmacyChainApi.create(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }

  dateAndTimeFields(billingContractPharmacyChain) {
    return {}
  }

  fetchPharmacyChain(pharmacy_id, nextOperation) {
    pharmacyChainApi.show(
      userCredentialsHelper.get(),
      pharmacy_id,
      nextOperation,
      this.onError
    )
  }

  helper() {
    return billingContractPharmacyChainHelper
  }

  loadData() {
    const { operation, billingContractPharmacyChain } = this.props
    this.addData(
      { operation, billingContractPharmacyChain: this.initializeDateAndTimeValidities(billingContractPharmacyChain) },
      this.redrawView
    )
  }

  model() {
    const { billingContractPharmacyChain, changedBillingContractPharmacyChain } = this.data

    return {
      changedModel: changedBillingContractPharmacyChain,
      model: billingContractPharmacyChain,
      modelName: this.modelName()
    }
  }

  modelName() {
    return "billingContractPharmacyChain"
  }

  requiredFields() {
    return billingContractPharmacyChainRequiredFields
  }

  selectPharmacyChain(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addPharmacyChainToAppointmentAndRedraw = (pharmacyChain) => {
      const { billingContractPharmacyChain, changedBillingContractPharmacyChain } = this.data
      const updated = billingContractPharmacyChainHelper.changePharmacyChain(
        billingContractPharmacyChain,
        changedBillingContractPharmacyChain,
        pharmacyChain
      )
      this.addData(updated, this.redrawView)
    }

    this.fetchPharmacyChain(value, addPharmacyChainToAppointmentAndRedraw)
  }

  update(modalChangedModel) {
    billingContractPharmacyChainApi.update(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }
}

export { BillingContractPharmacyChainModalViewModel }
