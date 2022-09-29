import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from '../../shared'
import { PharmacyClaimProfilePageViewModel } from "../../view_models/pages/pharmacy_claims"
import { fieldHelper, pharmacyClaimHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper, pathHelper } from "../../../helpers"

const PharmacyClaimReferences = ({ pathEntries, pharmacyClaim }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>References</h3>
        </CardTitle>

        <CardBody>
          {
            !pathHelper.isSingular(pathEntries, "health-plans") &&
            displayHelper.displayField("Health Plan", pharmacyClaimHelper.healthPlanName(pharmacyClaim))
          }
          {
            !pathHelper.isSingular(pathEntries, "patients") &&
            <React.Fragment>
              {displayHelper.display("Patient", pharmacyClaimHelper.patientName(pharmacyClaim))}
              {displayHelper.display("Member Number", pharmacyClaimHelper.memberNumber(pharmacyClaim))}
              {displayHelper.display("Person Number", pharmacyClaimHelper.personNumber(pharmacyClaim))}
            </React.Fragment>
          }
          {
            !pathHelper.isSingular(pathEntries, "pharmacy-stores") &&
            <React.Fragment>
              {
                displayHelper.display(
                  "Pharmacy Store",
                  pharmacyClaimHelper.pharmacyStoreId(pharmacyClaim)
                )
              }
              {
                displayHelper.display(
                  "Pharmacy NPI",
                  pharmacyClaimHelper.pharmacyNpi(pharmacyClaim)
                )
              }
            </React.Fragment>
          }
          {displayHelper.display("Medication", pharmacyClaimHelper.medicationLabel(pharmacyClaim))}
          {displayHelper.display("Physician", pharmacyClaimHelper.physicianName(pharmacyClaim))}
          {displayHelper.display("Physician NPI", pharmacyClaimHelper.physicianNpi(pharmacyClaim))}
          {displayHelper.booleanDisplay("Uploaded", pharmacyClaimHelper.wasUploaded(pharmacyClaim))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyClaimProfile = ({ pharmacyClaim }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {
            displayHelper.display(
              "Identifier",
              pharmacyClaimHelper.healthPlanPatientPharmacyClaimIdentifier(pharmacyClaim)
            )
          }
          {displayHelper.display("Prescription Number", pharmacyClaimHelper.prescriptionNumber(pharmacyClaim))}
          {displayHelper.dateDisplay("Filled", pharmacyClaimHelper.fillDate(pharmacyClaim))}
          {displayHelper.dateDisplay("Processed", pharmacyClaimHelper.processedDate(pharmacyClaim))}
          {displayHelper.display("Days Supply", pharmacyClaimHelper.daysSupply(pharmacyClaim))}
          {displayHelper.display("Quantity", pharmacyClaimHelper.quantity(pharmacyClaim))}
          {displayHelper.display("NDC", pharmacyClaimHelper.ndc(pharmacyClaim))}
          {displayHelper.display("Drug Name", pharmacyClaimHelper.drugName(pharmacyClaim))}
          {displayHelper.display("Drug Class", pharmacyClaimHelper.drugClass(pharmacyClaim))}
          {
            displayHelper.display(
              "Strength",
              fieldHelper.combineValues(
                pharmacyClaimHelper.strength(pharmacyClaim),
                pharmacyClaimHelper.strengthUnits(pharmacyClaim)
              )
            )
          }
          {
            displayHelper.display(
              "Dose",
              fieldHelper.combineValues(
                pharmacyClaimHelper.dose(pharmacyClaim),
                pharmacyClaimHelper.doseUnits(pharmacyClaim)
              )
            )
          }
          {
            displayHelper.display(
              "Frequency",
              fieldHelper.combineValues(
                pharmacyClaimHelper.frequency(pharmacyClaim),
                pharmacyClaimHelper.frequencyUnits(pharmacyClaim)
              )
            )
          }
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyClaimDisplay = ({ pathEntries, pharmacyClaim }) => {
  if (!valueHelper.isValue(pharmacyClaim)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PharmacyClaimProfile pathEntries={pathEntries} pharmacyClaim={pharmacyClaim} />
        <PharmacyClaimReferences pathEntries={pathEntries} pharmacyClaim={pharmacyClaim} />
      </Row>
    </React.Fragment>
  )
}

class PharmacyClaimProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PharmacyClaimProfilePageViewModel(
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
    const pathEntries = this.vm.pathEntries()
    const { pharmacyClaim } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{pharmacyClaimHelper.claimNumber(pharmacyClaim)}</h1>
          </div>

          <PharmacyClaimDisplay
            currentUser={this.props.currentUser}
            pathEntries={pathEntries}
            pharmacyClaim={pharmacyClaim}
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

export { PharmacyClaimProfilePage }
