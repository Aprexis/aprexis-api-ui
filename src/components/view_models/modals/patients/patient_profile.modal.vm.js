import { AbstractPatientModalViewModel } from "./"
import { contextHelper, healthPlanHelper, pathHelper, valueHelper } from "../../../../helpers"
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
