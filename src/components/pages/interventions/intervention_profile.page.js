import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { faClipboardCheck, faFileInvoice } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { EditButton, ModelConfigs, Spinner } from '../../shared/index.js'
import { InterventionProfilePageViewModel } from '../../view_models/pages/interventions/index.js'
import { interventionHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../helpers/index.js'

const InterventionConfiguration = ({ intervention }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {
            displayHelper.booleanDisplay(
              "Dry Run",
              valueHelper.isValue(interventionHelper.dryRunProgramPatientAssignmentId(intervention))
            )
          }
          {
            displayHelper.dateDisplay(
              "Consent Form Initiated At",
              interventionHelper.consentFormInitiatedAt(intervention)
            )
          }
          {
            displayHelper.display("Consent Form Initiator", interventionHelper.consentFormInitiator(intervention))
          }
          {displayHelper.display("Consent Obtained From", interventionHelper.displayConsentObtainedFrom(intervention))}
          {displayHelper.display("Form of Consent", interventionHelper.consentVia(intervention))}
          {displayHelper.booleanDisplay("Bill Later", interventionHelper.billLater(intervention))}
          {displayHelper.dollarDisplay("Provider Fee", interventionHelper.providerFee(intervention))}
          {displayHelper.dollarDisplay("Medicare Payment Amount", interventionHelper.medicarePaymentAmount(intervention))}
          {
            displayHelper.display(
              "Pharmacy Claim Tracking Number",
              interventionHelper.pharmacyClaimTrackingNumber(intervention))
          }
          <ModelConfigs helper={interventionHelper} modelConfigurable={intervention} />
        </CardBody>
      </Card>
    </Col>
  )
}

const InterventionProfile = ({ intervention, onEditModal }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              valueHelper.isFunction(onEditModal) &&
              <EditButton onEdit={(_event) => { onEditModal(intervention) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.notInContextDisplay("health-plans", "Health Plan", interventionHelper.healthPlanName(intervention))}
          {displayHelper.notInContextDisplay("patients", "Patient", interventionHelper.patientName(intervention))}
          {displayHelper.notInContextDisplay("programs", "Program", interventionHelper.programDisplay(intervention))}
          {
            displayHelper.notInContextDisplay(
              "pharmacy-stores",
              "Pharmacy Store",
              interventionHelper.pharmacyStoreDisplay(intervention)
            )
          }
          {displayHelper.display("Pharmacist", interventionHelper.pharmacistDisplay(intervention))}
          {displayHelper.notInContextDisplay("users", "User", interventionHelper.userName(intervention))}
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
          {displayHelper.dateDisplay("Date of Service", interventionHelper.dateOfService(intervention))}
          {displayHelper.dateDisplay("Pending Until", interventionHelper.pendingUntil(intervention))}
          {displayHelper.display("Place of Service", interventionHelper.serviceLocation(intervention))}
          {displayHelper.display("Venue", interventionHelper.venue(intervention))}
          {displayHelper.booleanDisplay("New Patient", interventionHelper.newPatient(intervention))}
          {
            displayHelper.display(
              "Diagnosis Code",
              interventionHelper.diagnosisCode(intervention),
              interventionHelper.diagnosisCodeLongDescription(intervention)
            )
          }
          {displayHelper.display("State", valueHelper.titleize(interventionHelper.state(intervention)))}
          {displayHelper.display("Closed Reason", interventionHelper.closedReason(intervention))}
          {displayHelper.display("Closed Reason Detail", interventionHelper.closedReasonDetail(intervention))}
          {displayHelper.dateTimeDisplay("User Started", interventionHelper.userStarted(intervention))}
          {displayHelper.dateTimeDisplay("Consult Started", interventionHelper.consultStarted(intervention))}
          {displayHelper.dateTimeDisplay("Consult Ended", interventionHelper.consultEnded(intervention))}
          {
            displayHelper.displayWithUnits(
              "Consult Session Duration",
              interventionHelper.consultSessionDuration(intervention),
              "minutes")
          }
          {
            displayHelper.displayWithUnits(
              "Consult Session Duration (Exact)",
              interventionHelper.consultSessionDurationExact(intervention),
              "minutes")
          }
          {
            displayHelper.displayWithUnits(
              "Face-to-Face",
              interventionHelper.consultSessionDurationFaceToFace(intervention),
              "minutes")
          }
          {displayHelper.dateTimeDisplay("User Ended", interventionHelper.userEnded(intervention))}
          {displayHelper.display("Contact Attempts", interventionHelper.contactAttempts(intervention))}
          {displayHelper.display("Physician's Response", interventionHelper.physiciansResponse(intervention))}
          {
            displayHelper.dateTimeDisplay(
              "Physician's Response Recorded At",
              interventionHelper.physiciansResponseRecordedAt(intervention)
            )
          }
          {displayHelper.booleanDisplay("Fax Bypassed", interventionHelper.faxBypassed(intervention))}
          {
            displayHelper.dateTimeDisplay(
              "Pharmacist Agreed To Submit Claim At",
              interventionHelper.pharmacistAgreedToSubmitClaimAt(intervention))
          }
          {displayHelper.display("Medicare Payment Status", interventionHelper.medicarePaymentStatus(intervention))}
        </CardBody>
      </Card>
    </Col>
  )
}

const InterventionDisplay = ({ intervention, onEditModal }) => {
  if (!valueHelper.isValue(intervention)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <InterventionProfile intervention={intervention} onEditModal={onEditModal} />
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
    const { currentUser } = this.props
    const { intervention } = this.state
    const onEditModal = determineEditModal(currentUser, intervention, this.vm)

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>Intervention</h1>

            <nav>
              <button className='mt-0 mb-0 pt-0 pb-0 ml-1 btn btn-xs' onClick={this.vm.gotoVerifyIntervention}>
                <FontAwesomeIcon icon={faClipboardCheck} />
                Verify
              </button>

              {
                this.vm.helper().state(intervention) == 'completed' &&
                <button className='mt-0 mb-0 pt-0 pb-0 ml-1 btn btn-xs' onClick={(_event) => { this.vm.submitBillingClaim(intervention) }}>
                  <FontAwesomeIcon icon={faFileInvoice} />
                  Submit Claim
                </button>
              }
            </nav>
          </div>

          <InterventionDisplay currentUser={this.props.currentUser} intervention={intervention} onEditModal={onEditModal} />
        </Col>
      </Container >
    )

    function determineEditModal(currentUser, intervention, vm) {
      if (!interventionHelper.canEdit(currentUser, intervention)) {
        return
      }

      if (interventionHelper.programType(intervention) == 'External Clinical Program') {
        return vm.editExternalModal
      }

      return
    }
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { InterventionProfilePage }
