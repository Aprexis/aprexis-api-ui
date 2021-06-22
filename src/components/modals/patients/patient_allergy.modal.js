import React, { Component } from "react"
import NumericInput from 'react-numeric-input'
import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap"
import { SelectAllergy } from "../../shared"
import { PatientAllergyModalViewModel } from "../../view_models/modals/patients"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, patientAllergyHelper, valueHelper } from "../../../helpers"
import { allergyCategories } from "../../../types"

class PatientAllergyModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientAllergyModalViewModel(
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
    const { patientAllergy } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="patient-allergy modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <Col xs={2}>
                    <label>Type</label>
                  </Col>
                  <Col xs={10}>
                    <Input
                      className="form-control"
                      disabled={!patientAllergyHelper.canModifyField(patientAllergy, "allergy_type")}
                      name="allergy_type"
                      onChange={this.vm.changeField}
                      readOnly={!patientAllergyHelper.canModifyField(patientAllergy, "allergy_type")}
                      type="select"
                      value={valueHelper.makeString(patientAllergyHelper.allergyType(patientAllergy))}>
                      {
                        allergyCategories.map(
                          (category) => {
                            return (
                              <option key={`allergy-category-${category}`} id={category}>{category}</option>
                            )
                          }
                        )
                      }
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}>
                    <label>Name</label>
                  </Col>
                  <Col xs={10}>
                    <Input
                      className="form-control"
                      disabled={!patientAllergyHelper.canModifyField(patientAllergy, "allergy_name")}
                      maxLength={255}
                      name="allergy_name"
                      onChange={this.vm.changeAllergyName}
                      readOnly={!patientAllergyHelper.canModifyField(patientAllergy, "allergy_name")}
                      value={valueHelper.makeString(patientAllergyHelper.allergyName(patientAllergy))}
                    />
                  </Col>
                </FormGroup>

                <SelectAllergy
                  {...valueHelper.importantProps(this.props)}
                  baseFilters={{}}
                  fieldName="Gold Standard"
                  inForm={true}
                  id={patientAllergyHelper.goldStandardAllergyId(patientAllergy)}
                  minSearchLength={this.vm.minSearchLength()}
                  onChange={this.vm.selectGoldStandardAllergy}
                  readOnly={!patientAllergyHelper.canModifyField(patientAllergy, "gold_standard_allergy_id")}
                />

                <FormGroup row>
                  <Col xs={2}>
                    <label>Reaction</label>
                  </Col>
                  <Col xs={10}>
                    <Input
                      className="form-control"
                      disabled={!patientAllergyHelper.canModifyField(patientAllergy, "reaction")}
                      maxLength={1000}
                      name="reaction"
                      onChange={this.vm.changeField}
                      readOnly={!patientAllergyHelper.canModifyField(patientAllergy, "reaction")}
                      type="textbox"
                      value={valueHelper.makeString(patientAllergyHelper.reaction(patientAllergy))}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}>
                    <label>Year</label>
                  </Col>
                  <Col xs={10}>
                    <NumericInput
                      className="form-control"
                      disabled={!patientAllergyHelper.canModifyField(patientAllergy, "year")}
                      max={(new Date()).year}
                      min={1900}
                      name="year"
                      onChange={this.vm.changeNumericField}
                      readOnly={!patientAllergyHelper.canModifyField(patientAllergy, "year")}
                      value={valueHelper.makeString(patientAllergyHelper.year(patientAllergy))}
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
    const { changedPatientAllergy, operation, patientAllergy } = this.state

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
              this.vm.submitModalCreateOrUpdate("patientAllergy", patientAllergy, changedPatientAllergy)
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient } = this.state
    const title = `Allergy for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }
}

const aprexisPatientAllergyModal = aprexisWrapperModal(PatientAllergyModal)
export { aprexisPatientAllergyModal as PatientAllergyModal }

