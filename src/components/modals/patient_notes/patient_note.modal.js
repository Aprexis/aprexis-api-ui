import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Label, Row } from "reactstrap"
import { TextFieldEditor } from "../../shared"
import { PatientNoteModalViewModel } from "../../view_models/modals/patient_notes"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { dateHelper, patientHelper, patientNoteHelper, pharmacyStoreHelper, valueHelper } from "@aprexis/aprexis-api-utility"

class PatientNoteModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientNoteModalViewModel(
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
    const { patientNote } = this.state
    const createdAt = patientNoteHelper.createdAt(patientNote)
    const updatedAt = patientNoteHelper.updatedAt(patientNote)

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
                  {
                    !valueHelper.isValue(createdAt) &&
                    <FormGroup row>
                      <Label>New Note</Label>
                    </FormGroup>
                  }

                  {
                    valueHelper.isValue(createdAt) &&
                    <React.Fragment>
                      <FormGroup row>
                        <Label htmlFor="created_at">Created At</Label>
                        <label
                          className={`mb-2 form-control`}
                          id="created_at"
                          name="created_at">
                          {dateHelper.displayDateTime(createdAt)}
                        </label>
                      </FormGroup>

                      <FormGroup row>
                        <Label htmlFor="updated_at">Updated At</Label>
                        <label
                          className={`mb-2 form-control`}
                          id="updated_at"
                          name="updated_at">
                          {dateHelper.displayDateTime(updatedAt)}
                        </label>
                      </FormGroup>
                    </React.Fragment>
                  }

                  <FormGroup row>
                    <TextFieldEditor
                      changeField={this.vm.changeField}
                      cols={80}
                      fieldName="note"
                      helper={patientNoteHelper}
                      model={patientNote}
                      rows={8}
                    />
                  </FormGroup>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { changedPatientNote, clearModal, operation, patientNote } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={(event) => { this.vm.submitModalCreateOrUpdate("patientNote", patientNote, changedPatientNote) }}>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient, pharmacyStore } = this.state
    const title = `Note for ${patientHelper.name(patient)} at ${pharmacyStoreHelper.name(pharmacyStore)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisPatientNoteModal = aprexisWrapperModal(PatientNoteModal)
export { aprexisPatientNoteModal as PatientNoteModal }
