import React, { Component } from "react"
import { Container } from "reactstrap"
import { PatientProfileModalViewModel } from "../../view_models/modals/patients"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, valueHelper } from "../../../helpers"

class PatientProfileModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientProfileModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    return (
      <AprexisModal
        {...this.props}
        modalClassName="filters modal-w"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <label>Not implemented yet</label>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { changedPatient, clearModal, operation, patient } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={(event) => { this.vm.submitModel("patient", patient, changedPatient) }}>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient } = this.state
    const title = `Profile for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }
}

const aprexisPatientProfileModal = aprexisWrapperModal(PatientProfileModal)
export { aprexisPatientProfileModal as PatientProfileModal }
