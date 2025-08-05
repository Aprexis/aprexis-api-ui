import { AbstractPatientModalViewModel } from "./abstract_patient.modal.vm.js"
import { healthPlanHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { contextHelper, pathHelper } from "../../../../helpers/index.js"
class PatientProfileModalViewModel extends AbstractPatientModalViewModel {
  constructor(props) {
    super(props)

    this.requiresPersonNumber = this.requiresPersonNumber.bind(this)
  }

  requiresPersonNumber() {
    if (!pathHelper.isSingular(this.pathEntries(), "health-plans")) {
      return false
    }

    const healthPlan = contextHelper.currentContext()['health-plans']
    return valueHelper.isSet(healthPlanHelper.requiresPersonNumber(healthPlan))
  }
}

export { PatientProfileModalViewModel }
