import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { EditButton, Spinner } from "../../../shared"
import { BillingContractTermProfilePageViewModel } from "../../../view_models/pages/billing/terms"
import { valueHelper, billingContractTermHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../../helpers"

const PatientSection = ({ billingContractTerm, patientType, section }) => {
  const patientSection = valueHelper.camelCase(`${patientType}_${section}`)
  return (
    <React.Fragment>
      {
        displayHelper.display(
          `${valueHelper.humanize(section)} CPT Code`,
          billingContractTermHelper[`${patientSection}CptCode`](billingContractTerm),
          "",
          ":",
          true
        )
      }
      {

        displayHelper.display(
          `${valueHelper.humanize(section)} User Mod`,
          billingContractTermHelper[`${patientSection}UserMod`](billingContractTerm),
          "",
          ":",
          true
        )
      }
      {
        displayHelper.display(
          `${valueHelper.humanize(section)} Charge`,
          billingContractTermHelper[`${patientSection}Charge`](billingContractTerm),
          "",
          ":",
          true
        )
      }
    </React.Fragment>
  )
}

const Patient = ({ billingContractTerm, currentUser, onEditPatient, patientType }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            {valueHelper.humanize(patientType)}
            {
              billingContractTermHelper.canEdit(currentUser, billingContractTerm) &&
              <EditButton onEdit={(_event) => { onEditPatient(billingContractTerm, patientType) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          <PatientSection
            billingContractTerm={billingContractTerm}
            patientType={patientType}
            section={'initial_15min'}
          />
          <PatientSection
            billingContractTerm={billingContractTerm}
            patientType={patientType}
            section={'additional_15min'}
          />
          <PatientSection
            billingContractTerm={billingContractTerm}
            patientType={patientType}
            section={'follow_up'}
          />
        </CardBody>
      </Card>
    </Col>
  )
}

const BillingContractTermProfile = ({ billingContractTerm, currentUser, onEditProfile }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              billingContractTermHelper.canEdit(currentUser, billingContractTerm) &&
              <EditButton onEdit={(_event) => { onEditProfile(billingContractTerm) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Diagnosis", billingContractTermHelper.diagnosis(billingContractTerm))}
          {displayHelper.display("Aprexis Fee", billingContractTermHelper.aprexisFee(billingContractTerm))}
          {
            displayHelper.booleanDisplay(
              "Allow Claims Despite Physician Denial",
              billingContractTermHelper.allowClaimsDespitePhysicianDenial(billingContractTerm)
            )
          }
          {
            displayHelper.display(
              "Family Plan",
              valueHelper.yesNo(billingContractTermHelper.familyPlan(billingContractTerm))
            )
          }
          {
            displayHelper.display(
              "EPSDT Family Plan",
              valueHelper.yesNo(billingContractTermHelper.epsdt(billingContractTerm))
            )
          }
          {
            displayHelper.booleanDisplay(
              "Pulls Enabled",
              billingContractTermHelper.pullsEnabled(billingContractTerm)
            )
          }
          {
            displayHelper.booleanDisplay(
              "Pushes Enabled",
              billingContractTermHelper.pushesEnabled(billingContractTerm)
            )
          }
          {displayHelper.display("Unit", billingContractTermHelper.unit(billingContractTerm))}
          {
            displayHelper.display(
              "Place of Service",
              billingContractTermHelper.placeOfService(billingContractTerm)
            )
          }
          {
            displayHelper.display(
              "Emergency Service",
              billingContractTermHelper.emergencyService(billingContractTerm)
            )
          }
          {displayHelper.display("Misc", billingContractTermHelper.misc(billingContractTerm))}
          {displayHelper.display("Note", billingContractTermHelper.note(billingContractTerm))}
        </CardBody>
      </Card>
    </Col>
  )
}

const BillingContractTermDisplay = ({ billingContractTerm, currentUser, onEditPatient, onEditProfile }) => {
  if (!valueHelper.isValue(billingContractTerm)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <BillingContractTermProfile
          billingContractTerm={billingContractTerm}
          currentUser={currentUser}
          onEditProfile={onEditProfile}
        />
      </Row>

      <Row>
        <Patient
          billingContractTerm={billingContractTerm}
          currentUser={currentUser}
          onEditPatient={onEditPatient}
          patientType={'new_patient'}
        />
        <Patient
          billingContractTerm={billingContractTerm}
          currentUser={currentUser}
          onEditPatient={onEditPatient}
          patientType={'existing_patient'}
        />

      </Row>
    </React.Fragment>
  )
}

class BillingContractTermProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractTermProfilePageViewModel(
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
    const { billingContractTerm } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{billingContractTermHelper.type(billingContractTerm)}</h1>
          </div>

          <BillingContractTermDisplay
            billingContractTerm={billingContractTerm}
            currentUser={this.props.currentUser}
            onEditPatient={this.vm.editPatientModal}
            onEditProfile={this.vm.editProfileModal}
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

export { BillingContractTermProfilePage }
