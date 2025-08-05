import React, { Component } from "react"
import { ConfirmModal } from './confirm.modal.js'
import { FiltersModal } from './filters.modal.js'
import { SignInModal } from "./sign_in.modal.js"
import { AnswerModal } from "./answers/answer.modal.js"
import { AppointmentModal } from "./appointments/appointment.modal.js"
import { BillingContractModal } from "./billing/contracts/billing_contract.modal.js"
import { BillingContractPharmacyChainModal } from "./billing/pharmacy_chains/index.js"
import { BillingContractPharmacyStoreModal } from "./billing/pharmacy_stores/index.js"
import { BillingContractTermPatientModal } from "./billing/terms/billing_contract_term_patient.modal.js"
import { BillingContractTermProfileModal } from "./billing/terms/billing_contract_term_profile.modal.js"
import { CaregiverModal } from "./caregivers/caregiver.modal.js"
import { ExternalInterventionProfileModal } from "./interventions/external_intervention_profile.modal.js"
import { LabTestValueModal } from "./lab_test_values/lab_test_value.modal.js"
import { LogoutOrRefreshModal } from "./logout_or_refresh.modal.js"
import { PatientAllergyModal } from "./patient_allergies/patient_allergy.modal.js"
import { PatientConfigurationModal } from "./patients/patient_configuration.modal.js"
import { PatientMedicationModal } from "./patient_medications/patient_medication.modal.js"
import { PatientNoteModal } from "./patient_notes/patient_note.modal.js"
import { PatientPhysicianModal } from "./patient_physicians/patient_physician.modal.js"
import { PatientProfileModal } from "./patients/patient_profile.modal.js"
import { PatientSubscriberModal } from "./patients/patient_subscriber.modal.js"
import { ReminderModal } from "./reminders/reminder.modal.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"

const modalList = {
  Answer: AnswerModal,
  Appointment: AppointmentModal,
  BillingContract: BillingContractModal,
  BillingContractPharmacyChain: BillingContractPharmacyChainModal,
  BillingContractPharmacyStore: BillingContractPharmacyStoreModal,
  BillingContractTermPatient: BillingContractTermPatientModal,
  BillingContractTermProfile: BillingContractTermProfileModal,
  Caregiver: CaregiverModal,
  Confirm: ConfirmModal,
  ExternalInterventionProfile: ExternalInterventionProfileModal,
  Filters: FiltersModal,
  LabTestValue: LabTestValueModal,
  LogoutOrRefresh: LogoutOrRefreshModal,
  PatientAllergy: PatientAllergyModal,
  PatientMedication: PatientMedicationModal,
  PatientNote: PatientNoteModal,
  PatientPhysician: PatientPhysicianModal,
  PatientConfiguration: PatientConfigurationModal,
  PatientProfile: PatientProfileModal,
  PatientSubscriber: PatientSubscriberModal,
  Reminder: ReminderModal,
  SignIn: SignInModal
}

class Modals extends Component {
  render() {
    const { modalProps, modalName, reconnectAndRetry } = this.props

    if (!valueHelper.isValue(modalName)) {
      return (<React.Fragment />)
    }

    console.log(`Rendering modal: ${modalName} ${JSON.stringify(modalProps)}`)

    const modalNameParts = modalName.split("-")
    const modal = modalNameParts.map((modalNamePart) => { return valueHelper.capitalizeWords(modalNamePart) }).join("")
    const Modal = modalList[modal]
    if (!valueHelper.isValue(Modal)) {
      return (
        <span>Could not build modal {modalName} ({modal}) (recognized? {JSON.stringify(modal in modalList)})</span>
      )
    }

    return (
      <Modal {...this.props} {...modalProps} date={new Date()} reconnectAndRetry={reconnectAndRetry} />
    )
  }
}

export { Modals }
