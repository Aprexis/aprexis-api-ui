import { AbstractModalViewModel } from "../../"
import { billingContractTermApi, valueHelper, billingContractTermHelper } from "@aprexis/aprexis-api-utility"

const billingContractTermRequiredFields = {
  contract_id: { label: "Contract", testMethod: valueHelper.isNumberValue }
}

class AbstractBillingContractTermModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    if (new.target === AbstractModalViewModel) {
      throw new TypeError("Cannot directly instantiate AbstractBillingContractTermModalViewModel instance; create a subclass instead")
    }

    super(props)
    this.api = this.api.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
  }

  api() {
    return billingContractTermApi
  }

  dateAndTimeFields(_billingContractTerm) {
    return {}
  }

  helper() {
    return billingContractTermHelper
  }

  loadData() {
    const { operation, billingContractTerm } = this.props
    this.addData(
      { operation, billingContractTerm: this.initializeDateAndTimeValidities(billingContractTerm) },
      this.redrawView
    )
  }

  model() {
    const { billingContractTerm, changedBillingContractTerm } = this.data

    return {
      changedModel: changedBillingContractTerm,
      model: billingContractTerm,
      modelName: this.modelName()
    }
  }

  modelName() {
    return "billingContractTerm"
  }

  requiredFields() {
    return billingContractTermRequiredFields
  }
}

export { AbstractBillingContractTermModalViewModel }
