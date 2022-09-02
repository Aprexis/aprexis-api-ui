import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap"
import {
  DayFieldEditor,
  NumberFieldEditor,
  SelectDiagnosisCode,
  SelectFieldEditor,
  SelectUser
} from "../../shared"
import { ExternalInterventionProfileModalViewModel } from "../../view_models/modals/interventions"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { userHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers"

const consentObtainedFrom = [
  { label: '', value: undefined },
  { label: 'Patient', value: 'Patient' },
  { label: 'Caregiver', value: 'Caregiver' }
]

const consentVia = [
  { label: '', value: undefined },
  { label: 'In Writing', value: 'Written' },
  { label: 'Verbally', value: 'Verbal' }
]

class ExternalInterventionProfileModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ExternalInterventionProfileModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.consentObtainedFromOptions = this.consentObtainedFromOptions.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  consentObtainedFromOptions() {
    return consentObtainedFrom.map(
      (type) => {
        return (<option key={`consent-obtained-from-${type.value}`}>{type.label}</option>)
      }
    )
  }

  render() {
    const { currentUser } = this.props
    const { intervention, consentObtainedFromType, placesOfService } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="extermal-intervention-profile modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <DayFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Date of Service"
                    fieldName="date_of_service"
                    fieldXs={5}
                    helper={this.vm.helper()}
                    labelXs={1}
                    model={intervention}
                    style={{ width: 110 }}
                    required={true}
                  />

                  <SelectFieldEditor
                    changeField={this.vm.changeServiceLocation}
                    fieldLabel='Place of Service'
                    fieldName='place_of_service'
                    fieldOptions={this.vm.placeOfServiceOptions(placesOfService)}
                    fieldValue={this.vm.helper().placeOfService(intervention)}
                    fieldXs={5}
                    helper={this.vm.helper()}
                    labelXs={1}
                    model={intervention}
                    required={true}
                  />
                </FormGroup>

                <FormGroup row>
                  <Col xs={1}>{displayHelper.label({ fieldLabel: 'Consent By', required: true })}</Col>
                  <Col xs={5}>
                    <Input
                      className="form-control"
                      onChange={this.vm.selectConsentObtainedFromType}
                      required={true}
                      type="select"
                      value={consentObtainedFromType}>
                      {this.consentObtainedFromOptions()}
                    </Input>
                  </Col>

                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel='Consent Given'
                    fieldName='consent_via'
                    fieldOptions={consentVia}
                    fieldValue={this.vm.helper().consentVia(intervention)}
                    fieldXs={5}
                    helper={this.vm.helper()}
                    labelXs={1}
                    model={intervention}
                    required={true}
                  />
                </FormGroup>

                <FormGroup row>
                  <NumberFieldEditor
                    changeField={this.vm.changeNumericField}
                    fieldLabel="Consult Session Duration (minutes)"
                    fieldName="consult_session_duration"
                    fieldXs={5}
                    helper={this.vm.helper()}
                    labelXs={1}
                    model={intervention}
                    min={1}
                    max={31}
                    required={true}
                  />
                </FormGroup>

                <FormGroup row>
                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel='Intervention State'
                    fieldName='state'
                    fieldOptions={[{ label: 'Consult', value: 'consult' }, { label: 'Completed', value: 'completed' }]}
                    fieldValue={this.vm.helper().state(intervention)}
                    fieldXs={5}
                    helper={this.vm.helper()}
                    labelXs={1}
                    model={intervention}
                    required={true}
                  />

                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel='Patient Status'
                    fieldName='new_patient'
                    fieldOptions={[{ label: '', value: undefined }, { label: 'Existing Patient', value: false }, { label: 'New Patient', value: true }]}
                    fieldValue={this.vm.helper().newPatient(intervention)}
                    fieldXs={5}
                    helper={this.vm.helper()}
                    labelXs={1}
                    model={intervention}
                    required={true}
                  />
                </FormGroup>

                <SelectDiagnosisCode
                  {...valueHelper.importantProps(this.props)}
                  baseFilters={{ for_type: 'Icd10' }}
                  fieldLabel="Diagnosis Code"
                  inForm={true}
                  id={this.vm.helper().diagnosisCodeId(intervention)}
                  minSearchLength={this.vm.minSearchLength()}
                  onChange={this.vm.selectDiagnosisCode}
                  required={true}
                />

                <FormGroup row>
                  <NumberFieldEditor
                    changeField={this.vm.changeNumericField}
                    fieldLabel="Usual and Customary Fee"
                    fieldName="provider_fee"
                    fieldXs={5}
                    helper={this.vm.helper()}
                    labelXs={1}
                    model={intervention}
                    min={1}
                    max={31}
                    required={true}
                  />
                </FormGroup>

                {
                  !userHelper.hasRole(currentUser, ["pharmacy_store_admin", "pharmacy_store_user"]) &&
                  <SelectUser
                    {...valueHelper.importantProps(this.props)}
                    baseFilters={{ for_pharmacy_store: this.vm.helper().pharmacyStoreId(intervention), for_role: ["pharmacy_store_admin", "pharmacy_store_user"] }}
                    fieldLabel="Pharmacist"
                    inForm={true}
                    id={this.vm.helper().pharmacistId(intervention)}
                    minSearchLength={this.vm.minSearchLength()}
                    onChange={this.vm.selectPharmacist}
                    required={true}
                    tableDisplayProps={["first_name", "last_name", "npi"]}
                  />
                }
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { changedIntervention, clearModal, operation, intervention } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(_event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={(_event) => { this.vm.submitModalCreateOrUpdate("intervention", intervention, changedIntervention) }}>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const title = "External Intervention"

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisExternalInterventionProfileModal = aprexisWrapperModal(ExternalInterventionProfileModal)
export { aprexisExternalInterventionProfileModal as ExternalInterventionProfileModal }
