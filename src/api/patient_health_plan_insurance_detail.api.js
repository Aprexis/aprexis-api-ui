import { API } from "./api"

export const patientHealthPlanInsuranceDetailApi = {
  profileForPatient
}

function profileForPatient(userCredentials, patient_id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_health_plan_insurance_details/profile_for_patient`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
