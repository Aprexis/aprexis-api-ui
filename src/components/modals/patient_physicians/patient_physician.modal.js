import { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import { SelectPhysician } from "../../shared/index.js"
import { PatientPhysicianModalViewModel } from "../../view_models/modals/patient_physicians/index.js"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals/index.js"
import { patientHelper, patientPhysicianHelper, valueHelper } from "@aprexis/aprexis-api-utility"

class PatientPhysicianModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientPhysicianModalViewModel(
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
    const { reconnectAndRetry } = this.props
    const { patientPhysician } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="patient-physician modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <SelectPhysician
                  {...valueHelper.importantProps(this.props)}
                  baseFilters={{ for_supersets: true }}
                  fieldLabel="Physician"
                  inForm={true}
                  id={patientPhysicianHelper.physicianId(patientPhysician)}
                  onChange={this.vm.selectPhysician}
                  readOnly={!patientPhysicianHelper.canModifyField(patientPhysician, "physician_id")}
                  reconnectAndRetry={reconnectAndRetry}
                />

                <FormGroup row>
                  <Col xs="2">
                    <label>Primary</label>
                  </Col>
                  <Col xs="9">
                    <input
                      checked={valueHelper.isSet(patientPhysicianHelper.primary(patientPhysician))}
                      name="primary"
                      onChange={this.vm.changeField}
                      type="checkbox"
                    />
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { clearModal } = this.props
    const { changedPatientPhysician, operation, patientPhysician } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={
            (event) => {
              this.vm.submitModalCreateOrUpdate("patientPhysician", patientPhysician, changedPatientPhysician)
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient } = this.state
    const title = `Physician for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisPatientPhysicianModal = aprexisWrapperModal(PatientPhysicianModal)
export { aprexisPatientPhysicianModal as PatientPhysicianModal }
