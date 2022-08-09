import { AbstractModalViewModel } from ".."
import { caregiverApi, valueHelper, caregiverHelper, relationships } from "@aprexis/aprexis-api-utility"

const caregiverRequiredFields = {
  patient_id: { label: "Patient", testMethod: valueHelper.isNumberValue },
  first_name: { label: "First Name", testMethod: valueHelper.isStringValue },
  last_name: { label: "Last Name", testMethod: valueHelper.isStringValue },
  relationship: { label: "Relationship", testMethod: (relationship) => relationships.includes(relationship) }
}

class CaregiverModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
  }

  api() {
    return caregiverApi
  }

  dateAndTimeFields(_caregiver) {
    return {}
  }

  helper() {
    return caregiverHelper
  }

  loadData() {
    const { operation, caregiver } = this.props
    this.addData(
      {
        operation,
        caregiver: this.initializeDateAndTimeValidities(caregiver)
      },
      this.redrawView
    )
  }

  model() {
    const { caregiver, changedCaregiver } = this.data

    return {
      changedModel: changedCaregiver,
      model: caregiver,
      modelName: this.modelName()
    }
  }

  modelName() {
    return "caregiver"
  }

  requiredFields() {
    return caregiverRequiredFields
  }
}

export { CaregiverModalViewModel }
