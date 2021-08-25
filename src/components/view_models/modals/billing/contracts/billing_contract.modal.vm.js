import { AbstractModalViewModel } from "../../"
import { billingContractApi } from "../../../../../api/billing"
import { userCredentialsHelper, valueHelper } from "../../../../../helpers"
import { billingContractHelper } from "../../../../../helpers/billing"

const billingContractDateFields = {
  start_date: { label: "Start Date", required: true, type: "date" },
  stop_date: { label: "Stop Date", required: true, type: "date" },
}

const billingContractRequiredFields = {
  health_plan_id: { label: "Health Plan", testMethod: valueHelper.isNumberValue },
  name: { label: "Name", testMethod: valueHelper.isStringValue }
}

class BillingContractModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
  }

  api() {
    return billingContractApi
  }

  dateAndTimeFields(billingContract) {
    return billingContractDateFields
  }

  helper() {
    return billingContractHelper
  }

  loadData() {
    const { operation, billingContract } = this.props
    this.addData(
      { operation, billingContract: this.initializeDateAndTimeValidities(billingContract) },
      this.redrawView
    )
  }

  model() {
    const { billingContract, changedBillingContract } = this.data

    return { changedModel: changedBillingContract, model: billingContract, modelName: this.modelName() }
  }

  requiredFields() {
    return billingContractRequiredFields
  }
}

export { BillingContractModalViewModel }
