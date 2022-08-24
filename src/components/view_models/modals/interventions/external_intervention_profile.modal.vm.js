import { AbstractModalViewModel } from "../"
import { interventionApi, dateHelper, interventionHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../helpers"

const interventionDateAndTimeFields = {
  date_of_service: { label: "Date of Service", required: true, type: "date" }
}

const interventionRequiredFields = {
  consult_session_duration: { label: 'Consult Session Duration', testMethod: valueHelper.isNumberValue },
  date_of_service: { label: "Date of Service", testMethod: dateHelper.isValidDate }
}

class ExternalInterventionProfileModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.create = this.create.bind(this)
    this.dateAndTimeFields = this.dateAndTimeFields.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
  }

  api() {
    return interventionApi
  }

  create(changedModel) {
    this.api().createExternal(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.getAdmin()),
      changedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }

  dateAndTimeFields() {
    return interventionDateAndTimeFields
  }

  helper() {
    return interventionHelper
  }

  loadData() {
    const { operation, intervention } = this.props
    this.addData({ operation, intervention: this.initializeDateAndTimeValidities(intervention) })
    this.redrawView()
  }

  model() {
    const { changedIntervention, intervention } = this.data

    return { changedModel: changedIntervention, model: intervention, modelName: this.modelName() }
  }

  modelName() {
    return 'intervention'
  }

  requiredFields() {
    return interventionRequiredFields
  }
}

export { ExternalInterventionProfileModalViewModel }
