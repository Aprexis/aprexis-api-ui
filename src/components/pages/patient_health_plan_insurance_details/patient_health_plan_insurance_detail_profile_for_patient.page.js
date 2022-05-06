import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { EditButton, Spinner } from '../../shared'
import { PatientHealthPlanInsuranceDetailProfileForPatientPageViewModel } from "../../view_models/pages/patient_health_plan_insurance_details"
import { fieldHelper, valueHelper } from "../../../helpers"

const PatientHealthPlanInsuranceDetailProfile = ({ currentUser, helper, onEditProfile, patientHealthPlanInsuranceDetail }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              helper.canEdit(currentUser, patientHealthPlanInsuranceDetail) &&
              <EditButton onEdit={(_event) => { onEditProfile(patientHealthPlanInsuranceDetail) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("Plan Name", helper.planName(patientHealthPlanInsuranceDetail))}
          {fieldHelper.booleanDisplay("Has Commercial Insurance?", helper.hasCommercialInsurance(patientHealthPlanInsuranceDetail))}
          {fieldHelper.booleanDisplay("Has Medicare", helper.hasMedicare(patientHealthPlanInsuranceDetail))}
          {fieldHelper.display("Primary Insurance Type", helper.primaryInsuranceType(patientHealthPlanInsuranceDetail))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientHealthPlanInsuranceDetailDisplay = ({ currentUser, helper, onEditProfile, patientHealthPlanInsuranceDetail }) => {
  if (!valueHelper.isValue(patientHealthPlanInsuranceDetail)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <PatientHealthPlanInsuranceDetailProfile
        currentUser={currentUser}
        helper={helper}
        onEditProfile={onEditProfile}
        patientHealthPlanInsuranceDetail={patientHealthPlanInsuranceDetail}
      />
    </Row>
  )
}
class PatientHealthPlanInsuranceDetailProfileForPatientPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientHealthPlanInsuranceDetailProfileForPatientPageViewModel(
      {
        ...props,
        view: this
      }
    )
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { patientHealthPlanInsuranceDetail } = this.state
    const helper = this.vm.helper()

    return (
      <Container className='patient-health-plan-insurance-detail-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {helper.displayType(patientHealthPlanInsuranceDetail)} for {helper.patientName(patientHealthPlanInsuranceDetail)}
            </h1>
          </div>

          <PatientHealthPlanInsuranceDetailDisplay
            currentUser={this.props.currentUser}
            helper={helper}
            onEditProfile={this.vm.editProfileModal}
            patientHealthPlanInsuranceDetail={patientHealthPlanInsuranceDetail}
          />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PatientHealthPlanInsuranceDetailProfileForPatientPage }
