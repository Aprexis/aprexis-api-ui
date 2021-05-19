import React, { Component } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { DisplayAlert } from "../../components/shared"
import { dateHelper, valueHelper } from "../../helpers"

class AprexisModal extends Component {
  render() {
    const {
      children,
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
        className={`${modalClassName} modal-dialog dialog-centered`}
        isOpen={openModal}
        toggle={() => { toggleModal(this.props.onClearModal) }}>
        <ModalHeader toggle={() => { toggleModal(this.props.onClearModal) }}>
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
