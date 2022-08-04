import React, { Component } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { DisplayAlert } from "../../components/shared"
import { dateHelper, valueHelper } from "@aprexis/aprexis-api-utility"

class AprexisModal extends Component {
  render() {
    const {
      children,
      clearModal,
      date,
      modalClassName,
      modalDate,
      modalFooterComponents,
      modalHeaderComponents,
      modalVisible,
      toggleModal
    } = this.props
    const openModal = valueHelper.isSet(modalVisible) || (dateHelper.isDateValue(modalDate) && +modalDate != +date)

    return (
      <Modal
        className={`${modalClassName} modal-dialog modal-dialog-centered`}
        isOpen={openModal}
        toggle={() => { toggleModal(clearModal) }}>
        <ModalHeader toggle={() => { toggleModal(clearModal) }}>
          {modalHeaderComponents}
        </ModalHeader>

        <ModalBody>
          <DisplayAlert clearAlert={this.props.clearAlert} modalIsOpen={openModal} parentType="modal" />
          {children}
        </ModalBody>

        <ModalFooter>
          {modalFooterComponents}
        </ModalFooter>
      </Modal>
    )
  }
}

export { AprexisModal }
