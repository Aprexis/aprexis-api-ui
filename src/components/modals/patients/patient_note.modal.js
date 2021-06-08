import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Label, Row } from "reactstrap"
import { PatientNoteModalViewModel } from "../../view_models/modals/patients"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { dateHelper, patientHelper, patientNoteHelper, pharmacyStoreHelper, valueHelper } from "../../../helpers"

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
                    <Label htmlFor="note">Note</Label>
                    <textarea
                      className={`mb-2 form-control`}
                      cols={80}
                      id="note"
                      name="note"
                      onChange={this.vm.changeField}
                      maxLength={4096}
                      placeholder={'note'}
                      rows={8}
                      type="textarea"
                      value={valueHelper.makeString(patientNoteHelper.note(patientNote))}
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
          onClick={(event) => { this.vm.submitModel("patientNote", patientNote, changedPatientNote) }}>
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
}

const aprexisPatientNoteModal = aprexisWrapperModal(PatientNoteModal)
export { aprexisPatientNoteModal as PatientNoteModal }
