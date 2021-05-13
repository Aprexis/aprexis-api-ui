import React, { Component } from "react"
import { Col, Container, Form, Row } from "reactstrap"
import { PatientMedicationModalViewModel } from "../../view_models/modals/patients"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, valueHelper } from "../../../helpers"

class PatientMedicationModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientMedicationModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.renderDateTime = this.renderDateTime.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    //const { patientMedication } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="filters modal-w"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col className='d-flex justify-content-center'>
              <Form>
                <div className='justify-content-center'>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { changedPatientMedication, operation, patientMedication } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={this.vm.clearModal}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={(event) => { this.vm.submitModel("patientMedication", patientMedication, changedPatientMedication) }}>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient } = this.state
    const title = `Medication for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }
}

const aprexisPatientMedicationModal = aprexisWrapperModal(PatientMedicationModal)
export { aprexisPatientMedicationModal as PatientMedicationModal }
