import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from "../../../shared"
import { MedicationProfilePageViewModel } from "../../../view_models/pages/admin/medications"
import { fieldHelper, valueHelper } from "../../../../helpers"
import { medicationHelper } from "../../../../helpers/admin"

const MedicationProfile = ({ medication }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("Name", medicationHelper.name(medication))}
          {fieldHelper.display("Labeler Name", medicationHelper.labelerName(medication))}
          {fieldHelper.display("NDC Labeler Code", medicationHelper.ndcLabelerCode(medication))}
          {fieldHelper.display("Product NDC", medicationHelper.productNdc(medication))}
          {fieldHelper.display("NDC 11 Codes", medicationHelper.ndc11Codes(medication))}
          {fieldHelper.display("NDC Product Code", medicationHelper.ndcProductCode(medication))}
          {fieldHelper.display("Product Type Name", medicationHelper.productTypeName(medication))}
          {fieldHelper.display("Proprietary Name", medicationHelper.proprietaryName(medication))}
          {fieldHelper.display("Proprietary Name Suffix", medicationHelper.proprietaryNameSuffix(medication))}
          {fieldHelper.display("Non Proprietary Name", medicationHelper.nonProprietaryName(medication))}
          {fieldHelper.display("Dosage Form Name", medicationHelper.dosageFormName(medication))}
          {fieldHelper.display("Route Name", medicationHelper.routeName(medication))}
          {fieldHelper.dateDisplay("Start Marketing Date", medicationHelper.startMarketingDate(medication))}
          {fieldHelper.dateDisplay("End Marketing Date", medicationHelper.endMarketingDate(medication))}
          {fieldHelper.display("Marketing Category Name", medicationHelper.marketingCategoryName(medication))}
          {fieldHelper.display("Application Number", medicationHelper.applicationNumber(medication))}
          {fieldHelper.display("Substance Name", medicationHelper.substanceName(medication))}
          {fieldHelper.display("Active Numerator Strength", medicationHelper.activeNumeratorStrength(medication))}
          {fieldHelper.display("Active Ingredient Unit", medicationHelper.activeIngredUnit(medication))}
          {fieldHelper.display("Pharmaceutical Classes", medicationHelper.pharmClasses(medication))}
          {fieldHelper.display("DEA Schedule", medicationHelper.deaSchedule(medication))}
        </CardBody>
      </Card>
    </Col>
  )
}

const MedicationReferences = ({ medication }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>References</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.booleanDisplay("Is Superset", medicationHelper.medicationSuperset(medication))}
          {
            !valueHelper.isSet(medicationHelper.medicationSuperset(medication)) &&
            fieldHelper.display("Superset Label", medicationHelper.supersetLabel(medication))
          }
          {
            fieldHelper.booleanDisplay(
              "Is Gold Standard Medication",
              valueHelper.isValue(medicationHelper.goldStandardProductId(medication))
            )
          }
          {
            fieldHelper.display("DIN", medicationHelper.din(medication))
          }
        </CardBody>
      </Card>
    </Col>
  )
}

const MedicationDisplay = ({ currentUser, medication }) => {
  if (!valueHelper.isValue(medication)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <MedicationProfile medication={medication} />
        <MedicationReferences medication={medication} />
      </Row>
    </React.Fragment>
  )
}

class MedicationProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new MedicationProfilePageViewModel(
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
    const { medication } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{medicationHelper.label(medication)}</h1>
          </div>

          <MedicationDisplay currentUser={this.props.currentUser} medication={medication} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { MedicationProfilePage }
