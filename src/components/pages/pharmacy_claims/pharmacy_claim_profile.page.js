import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from '../../shared'
import { PharmacyClaimProfilePageViewModel } from "../../view_models/pages/pharmacy_claims"
import { fieldHelper, pathHelper, pharmacyClaimHelper, valueHelper } from "../../../helpers"

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
            fieldHelper.displayField("Health Plan", pharmacyClaimHelper.healthPlanName(pharmacyClaim))
          }
          {
            !pathHelper.isSingular(pathEntries, "patients") &&
            <React.Fragment>
              {fieldHelper.display("Patient", pharmacyClaimHelper.patientName(pharmacyClaim))}
              {fieldHelper.display("Member Number", pharmacyClaimHelper.memberNumber(pharmacyClaim))}
              {fieldHelper.display("Person Number", pharmacyClaimHelper.personNumber(pharmacyClaim))}
            </React.Fragment>
          }
          {
            !pathHelper.isSingular(pathEntries, "pharmacy-stores") &&
            <React.Fragment>
              {
                fieldHelper.display(
                  "Pharmacy Store",
                  pharmacyClaimHelper.pharmacyStoreIdentification(pharmacyClaim)
                )
              }
              {
                fieldHelper.display(
                  "Pharmacy NPI",
                  pharmacyClaimHelper.pharmacyNpi(pharmacyClaim)
                )
              }
            </React.Fragment>
          }
          {fieldHelper.display("Medication", pharmacyClaimHelper.medicationLabel(pharmacyClaim))}
          {fieldHelper.display("Physician", pharmacyClaimHelper.physicianName(pharmacyClaim))}
          {fieldHelper.display("Physician NPI", pharmacyClaimHelper.physicianNpi(pharmacyClaim))}
          {fieldHelper.booleanDisplay("Uploaded", pharmacyClaimHelper.wasUploaded(pharmacyClaim))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyClaimProfile = ({ pathEntries, pharmacyClaim }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {
            fieldHelper.display(
              "Identifier",
              pharmacyClaimHelper.healthPlanPatientPharmacyClaimIdentifier(pharmacyClaim)
            )
          }
          {fieldHelper.display("Prescription Number", pharmacyClaimHelper.prescriptionNumber(pharmacyClaim))}
          {fieldHelper.dateDisplay("Filled", pharmacyClaimHelper.fillDate(pharmacyClaim))}
          {fieldHelper.dateDisplay("Processed", pharmacyClaimHelper.processedDate(pharmacyClaim))}
          {fieldHelper.display("Days Supply", pharmacyClaimHelper.daysSupply(pharmacyClaim))}
          {fieldHelper.display("Quantity", pharmacyClaimHelper.quantity(pharmacyClaim))}
          {fieldHelper.display("NDC", pharmacyClaimHelper.ndc(pharmacyClaim))}
          {fieldHelper.display("Drug Name", pharmacyClaimHelper.drugName(pharmacyClaim))}
          {fieldHelper.display("Drug Class", pharmacyClaimHelper.drugClass(pharmacyClaim))}
          {
            fieldHelper.display(
              "Strength",
              fieldHelper.combineValues(
                pharmacyClaimHelper.strength(pharmacyClaim),
                pharmacyClaimHelper.strengthUnits(pharmacyClaim)
              )
            )
          }
          {
            fieldHelper.display(
              "Dose",
              fieldHelper.combineValues(
                pharmacyClaimHelper.dose(pharmacyClaim),
                pharmacyClaimHelper.doseUnits(pharmacyClaim)
              )
            )
          }
          {
            fieldHelper.display(
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
}

export { PharmacyClaimProfilePage }
