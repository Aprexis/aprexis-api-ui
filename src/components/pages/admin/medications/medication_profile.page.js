import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from "../../../shared"
import { MedicationProfilePageViewModel } from "../../../view_models/pages/admin/medications"
import { valueHelper, medicationHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../../helpers"

const MedicationProfile = ({ medication }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Name", medicationHelper.name(medication))}
          {displayHelper.display("Labeler Name", medicationHelper.labelerName(medication))}
          {displayHelper.display("NDC Labeler Code", medicationHelper.ndcLabelerCode(medication))}
          {displayHelper.display("Product NDC", medicationHelper.productNdc(medication))}
          {displayHelper.display("NDC 11 Codes", medicationHelper.ndc11Codes(medication))}
          {displayHelper.display("NDC Product Code", medicationHelper.ndcProductCode(medication))}
          {displayHelper.display("Product Type Name", medicationHelper.productTypeName(medication))}
          {displayHelper.display("Proprietary Name", medicationHelper.proprietaryName(medication))}
          {displayHelper.display("Proprietary Name Suffix", medicationHelper.proprietaryNameSuffix(medication))}
          {displayHelper.display("Non Proprietary Name", medicationHelper.nonProprietaryName(medication))}
          {displayHelper.display("Dosage Form Name", medicationHelper.dosageFormName(medication))}
          {displayHelper.display("Route Name", medicationHelper.routeName(medication))}
          {displayHelper.dateDisplay("Start Marketing Date", medicationHelper.startMarketingDate(medication))}
          {displayHelper.dateDisplay("End Marketing Date", medicationHelper.endMarketingDate(medication))}
          {displayHelper.display("Marketing Category Name", medicationHelper.marketingCategoryName(medication))}
          {displayHelper.display("Application Number", medicationHelper.applicationNumber(medication))}
          {displayHelper.display("Substance Name", medicationHelper.substanceName(medication))}
          {displayHelper.display("Active Numerator Strength", medicationHelper.activeNumeratorStrength(medication))}
          {displayHelper.display("Active Ingredient Unit", medicationHelper.activeIngredUnit(medication))}
          {displayHelper.display("Pharmaceutical Classes", medicationHelper.pharmClasses(medication))}
          {displayHelper.display("DEA Schedule", medicationHelper.deaSchedule(medication))}
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
          {displayHelper.booleanDisplay("Is Superset", medicationHelper.medicationSuperset(medication))}
          {
            !valueHelper.isSet(medicationHelper.medicationSuperset(medication)) &&
            displayHelper.display("Superset Label", medicationHelper.supersetLabel(medication))
          }
          {
            displayHelper.booleanDisplay(
              "Is Gold Standard Medication",
              valueHelper.isValue(medicationHelper.goldStandardProductId(medication))
            )
          }
          {
            displayHelper.display("DIN", medicationHelper.din(medication))
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
