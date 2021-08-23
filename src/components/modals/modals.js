import React, { Component } from "react"
import { ConfirmModal, FiltersModal, SignInModal } from "./"
import { AppointmentModal } from "./appointments"
import { BillingContractModal } from "./billing/contracts"
import { BillingContractPharmacyChainModal } from "./billing/pharmacy_chains"
import { BillingContractPharmacyStoreModal } from "./billing/pharmacy_stores"
import { PatientAllergyModal } from "./patient_allergies"
import { PatientMedicationModal } from "./patient_medications"
import { PatientNoteModal } from "./patient_notes"
import { PatientPhysicianModal } from "./patient_physicians"
import { PatientProfileModal } from "./patients"
import { valueHelper } from "../../helpers"

const modalList = {
  Appointment: AppointmentModal,
  BillingContract: BillingContractModal,
  BillingContractPharmacyChain: BillingContractPharmacyChainModal,
  BillingContractPharmacyStore: BillingContractPharmacyStoreModal,
  Confirm: ConfirmModal,
  Filters: FiltersModal,
  PatientAllergy: PatientAllergyModal,
  PatientMedication: PatientMedicationModal,
  PatientNote: PatientNoteModal,
  PatientPhysician: PatientPhysicianModal,
  PatientProfile: PatientProfileModal,
  SignIn: SignInModal
}

class Modals extends Component {
  render() {
    const { modalProps, modalName } = this.props
    if (!valueHelper.isValue(modalName)) {
      return (<React.Fragment />)
    }

    const modalNameParts = modalName.split("-")
    const modal = modalNameParts.map((modalNamePart) => { return valueHelper.capitalizeWords(modalNamePart) }).join("")
    const Modal = modalList[modal]
    if (!valueHelper.isValue(Modal)) {
      return (
        <span>Could not build modal {modalName} ({modal}) (recognized? {JSON.stringify(modal in modalList)})</span>
      )
    }

    return (
      <Modal {...this.props} {...modalProps} date={new Date()} />
    )
  }
}

export { Modals }
