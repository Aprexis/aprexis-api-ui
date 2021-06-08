import React, { Component } from "react"
import { FiltersModal, SignInModal } from "./"
import { PatientMedicationModal, PatientNoteModal, PatientProfileModal } from "./patients"
import { valueHelper } from "../../helpers"

const modalList = {
  Filters: FiltersModal,
  PatientMedication: PatientMedicationModal,
  PatientNote: PatientNoteModal,
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
