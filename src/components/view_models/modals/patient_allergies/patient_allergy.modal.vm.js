import { AbstractModalViewModel } from "../"
import { patientApi, patientAllergyApi } from "../../../../api"
import { goldStandardAllergyApi } from "../../../../api/gold_standard"
import {
  fieldHelper,
  jsEventHelper,
  pathHelper,
  patientAllergyHelper,
  userCredentialsHelper,
  valueHelper
} from "../../../../helpers"

const patientAllergyRequiredFields = {
  patient_id: { label: "Patient", testMethod: valueHelper.isNumberValue }
}

class PatientAllergyModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.changeAllergyName = this.changeAllergyName.bind(this)
    this.fetchGoldStandardAllergy = this.fetchGoldStandardAllergy.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.minSearchLength = this.minSearchLength.bind(this)
    this.model = this.model.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectGoldStandardAllergy = this.selectGoldStandardAllergy.bind(this)
  }

  api() {
    return patientAllergyApi
  }

  changeAllergyName(event) {
    const { name, value } = jsEventHelper.fromInputEvent(event)
    if (name != "allergy_name") {
      return
    }

    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    let updated = fieldHelper.changeValue(modelName, model, changedModel, "allergy_name", value)

    if (!valueHelper.isStringValue(value) || value.length < this.minSearchLength() || value.endsWith(" ")) {
      updated = fieldHelper.changeValue(
        modelName,
        updated[modelName],
        updated[valueHelper.changedModelName(modelName)],
        "gold_standard_allergy_id",
        null
      )
      this.addData(updated, this.redrawView)
      return
    }

    goldStandardAllergyApi.match_name(
      userCredentialsHelper.get(),
      value,
      (goldStandardAllergy) => {
        updated = patientAllergyHelper.changeGoldStandardAllergy(
          modelName,
          updated[modelName],
          updated[valueHelper.changedModelName(modelName)],
          goldStandardAllergy
        )

        this.addData(updated, this.redrawView)
      },
      this.onError
    )
  }

  dateAndTimeFields() {
    return []
  }

  fetchGoldStandardAllergy(goldStandardAllergyId, nextOperation) {
    goldStandardAllergyApi.show(
      userCredentialsHelper.get(),
      goldStandardAllergyId,
      nextOperation,
      this.onError
    )
  }

  fetchPatient(patientId, nextOperation) {
    patientApi.show(
      userCredentialsHelper.get(),
      patientId,
      nextOperation,
      this.onError
    )
  }

  helper() {
    return patientAllergyHelper
  }

  loadData() {
    const { operation, patientAllergy } = this.props
    this.addData({ operation, patientAllergy: this.initializeDateAndTimeValidities(patientAllergy) })

    const pathEntries = this.pathEntries()
    const addPatientAndRedraw = (patient) => {
      this.addField("patient", patient, this.redrawView)
    }
    this.fetchPatient(pathHelper.id(pathEntries, "patients"), addPatientAndRedraw)
  }

  minSearchLength() {
    return 3
  }

  model() {
    const { changedPatientAllergy, patientAllergy } = this.data

    return { changedModel: changedPatientAllergy, model: patientAllergy, modelName: "patientAllergy" }
  }

  requiredFields() {
    return patientAllergyRequiredFields
  }

  selectGoldStandardAllergy(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addGoldStandardAllergyToPatientAllergyAndRedraw = (goldStandardAllergy) => {
      const modelData = this.model()
      const { model, modelName } = modelData
      const changedModel = this.helper().buildChanged(model, modelData.changedModel)
      const updated = patientAllergyHelper.changeGoldStandardAllergy(
        modelName,
        model,
        changedModel,
        goldStandardAllergy
      )
      this.addData(updated, this.redrawView)
    }

    this.fetchGoldStandardAllergy(value, addGoldStandardAllergyToPatientAllergyAndRedraw)
  }
}

export { PatientAllergyModalViewModel }
