import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { ConfirmModalViewModal } from "../view_models/modals"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../containers/modals"

class ConfirmModal extends Component {
  constructor(props) {
    super(props)

    this.vm = new ConfirmModalViewModal({ ...props, view: this })

    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  render() {
    const { confirmText, children } = this.props
    const text = valueHelper.isStringValue(confirmText) ? confirmText : "Are you sure?"

    return (
      <AprexisModal
        {...this.props}
        modalClassName="confirm-modal modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <div>
                {text}
              </div>

              {children}
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { noLabel, yesLabel } = this.props
    const confirmLabel = valueHelper.isStringValue(yesLabel) ? yesLabel : "Yes"
    const denyLabel = valueHelper.isStringValue(noLabel) ? noLabel : "No"

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={this.vm.deny}>
          {denyLabel}
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={this.vm.confirm}>
          {confirmLabel}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { confirmTitle } = this.props
    const title = valueHelper.isStringValue(confirmTitle) ? confirmTitle : "Confirm"

    return (
      <AprexisModalHeader title={title} />
    )
  }
}

const aprexisConfirmModal = aprexisWrapperModal(ConfirmModal)
export { aprexisConfirmModal as ConfirmModal }
