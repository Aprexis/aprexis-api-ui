import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { DisplayAlert } from '../../components/shared'
import { dateHelper, valueHelper } from '../../helpers'

class AprexisModal extends Component {
  render() {
    const { children, date, modalClassName, modalDate, modalFooterComponents, modalHeaderComponents, modalVisible, toggleModal } = this.props
    const openModal = valueHelper.isSet(modalVisible) || (dateHelper.isDateValue(modalDate) && +modalDate != +date)

    return (
      <Modal
        className={`${modalClassName} modal-dialog dialog-centered`}
        isOpen={openModal}
        toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {modalHeaderComponents}
        </ModalHeader>

        <ModalBody>
          <DisplayAlert parentType='modal' />
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
