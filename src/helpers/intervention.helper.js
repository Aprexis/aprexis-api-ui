import { patientHelper, valueHelper } from "./"

export const interventionHelper = {
  name
}

function name(intervention) {
  if (!valueHelper.isValue(intervention)) {
    return "No intervention"
  }

  return patientHelper.name(intervention.patient)
}
