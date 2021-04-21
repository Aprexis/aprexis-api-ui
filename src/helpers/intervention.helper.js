import { patientHelper, valueHelper } from "./"

export const interventionHelper = {
  name
}

function name(intervention) {
  return patientHelper.name(valueHelper.getField(intervention, "patient"))
}

