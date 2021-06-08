import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../shared'
import { InterventionProfilePageViewModel } from '../../view_models/pages/interventions'
import { fieldHelper, interventionHelper, valueHelper } from '../../../helpers'

const InterventionConfiguration = ({ intervention }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {
            fieldHelper.booleanDisplay(
              "Dry Run",
              valueHelper.isValue(interventionHelper.dryRunProgramPatientAssignmentId(intervention))
            )
          }
          {
            fieldHelper.dateDisplay(
              "Consent Form Initiated At",
              interventionHelper.consentFormInitiatedAt(intervention)
            )
          }
          {
            fieldHelper.display("Consent Form Initiator", interventionHelper.consentFormInitiator(intervention))
          }
          {fieldHelper.booleanDisplay("Consent Form on File", interventionHelper.consentFormOnFile(intervention))}
          {fieldHelper.booleanDisplay("Bill Later", interventionHelper.billLater(intervention))}
          {fieldHelper.dollarDisplay("Provider Fee", interventionHelper.providerFee(intervention))}
          {fieldHelper.dollarDisplay("Medicare Payment Amount", interventionHelper.medicarePaymentAmount(intervention))}
          {
            fieldHelper.display(
              "Pharmacy Claim Tracking Number",
              interventionHelper.pharmacyClaimTrackingNumber(intervention))
          }
        </CardBody>
      </Card>
    </Col>
  )
}

const InterventionProfile = ({ intervention }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.notInContextDisplay("health-plans", "Health Plan", interventionHelper.healthPlanName(intervention))}
          {fieldHelper.notInContextDisplay("patients", "Patient", interventionHelper.patientName(intervention))}
          {fieldHelper.notInContextDisplay("programs", "Program", interventionHelper.programDisplay(intervention))}
          {
            fieldHelper.notInContextDisplay(
              "pharmacy-stores",
              "Pharmacy Store",
              interventionHelper.pharmacyStoreDisplay(intervention)
            )
          }
          {fieldHelper.display("Pharmacist", interventionHelper.pharmacistDisplay(intervention))}
          {fieldHelper.notInContextDisplay("users", "User", interventionHelper.userName(intervention))}
        </CardBody>
      </Card>
    </Col>
  )
}

const InterventionStatus = ({ intervention }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Status</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.dateDisplay("Date of Service", interventionHelper.dateOfService(intervention))}
          {fieldHelper.dateDisplay("Pending Until", interventionHelper.pendingUntil(intervention))}
          {fieldHelper.display("Place of Service", interventionHelper.serviceLocation(intervention))}
          {fieldHelper.display("Venue", interventionHelper.venue(intervention))}
          {fieldHelper.booleanDisplay("New Patient", interventionHelper.newPatient(intervention))}
          {
            fieldHelper.display(
              "Diagnosis Code",
              interventionHelper.diagnosisCode(intervention),
              interventionHelper.diagnosisCodeLongDescription(intervention)
            )
          }
          {fieldHelper.display("State", interventionHelper.state(intervention))}
          {fieldHelper.display("Closed Reason", interventionHelper.closedReason(intervention))}
          {fieldHelper.display("Closed Reason Detail", interventionHelper.closedReasonDetail(intervention))}
          {fieldHelper.dateTimeDisplay("User Started", interventionHelper.userStarted(intervention))}
          {fieldHelper.dateTimeDisplay("Consult Started", interventionHelper.consultStarted(intervention))}
          {fieldHelper.dateTimeDisplay("Consult Ended", interventionHelper.consultEnded(intervention))}
          {
            fieldHelper.displayWithUnits(
              "Consult Session Duration",
              interventionHelper.consultSessionDuration(intervention),
              "minutes")
          }
          {
            fieldHelper.displayWithUnits(
              "Consult Session Duration (Exact)",
              interventionHelper.consultSessionDurationExact(intervention),
              "minutes")
          }
          {
            fieldHelper.displayWithUnits(
              "Face-to-Face",
              interventionHelper.consultSessionDurationFaceToFace(intervention),
              "minutes")
          }
          {fieldHelper.dateTimeDisplay("User Ended", interventionHelper.userEnded(intervention))}
          {fieldHelper.display("Contact Attempts", interventionHelper.contactAttempts(intervention))}
          {fieldHelper.display("Physician's Response", interventionHelper.physiciansResponse(intervention))}
          {
            fieldHelper.dateTimeDisplay(
              "Physician's Response Recorded At",
              interventionHelper.physiciansResponseRecordedAt(intervention)
            )
          }
          {fieldHelper.booleanDisplay("Fax Bypassed", interventionHelper.faxBypassed(intervention))}
          {
            fieldHelper.dateTimeDisplay(
              "Pharmacist Agreed To Submit Claim At",
              interventionHelper.pharmacistAgreedToSubmitClaimAt(intervention))
          }
          {fieldHelper.display("Medicare Payment Status", interventionHelper.medicarePaymentStatus(intervention))}
        </CardBody>
      </Card>
    </Col>
  )
}

const InterventionDisplay = ({ intervention }) => {
  if (!valueHelper.isValue(intervention)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <InterventionProfile intervention={intervention} />
        <InterventionStatus intervention={intervention} />
      </Row>

      <Row>
        <InterventionConfiguration intervention={intervention} />
      </Row>
    </React.Fragment>
  )
}

class InterventionProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new InterventionProfilePageViewModel(
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
    const { intervention } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>Intervention</h1>
          </div>

          <InterventionDisplay currentUser={this.props.currentUser} intervention={intervention} />
        </Col>
      </Container>
    )
  }
}

export { InterventionProfilePage }
