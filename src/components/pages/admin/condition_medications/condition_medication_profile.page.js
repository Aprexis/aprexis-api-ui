import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from "../../../shared/index.js"
import { ConditionMedicationProfilePageViewModel } from "../../../view_models/pages/admin/condition_medications/index.js"
import { valueHelper, conditionMedicationHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from '../../../../helpers/index.js'

const ConditionMedicationProfile = ({ conditionMedication }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Medication", conditionMedicationHelper.medicationLabel(conditionMedication))}
        </CardBody>
      </Card>
    </Col>
  )
}

const ConditionMedicationDisplay = ({ conditionMedication }) => {
  if (!valueHelper.isValue(conditionMedication)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <ConditionMedicationProfile conditionMedication={conditionMedication} />
      </Row>
    </React.Fragment>
  )
}

class ConditionMedicationProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ConditionMedicationProfilePageViewModel(
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
    const { conditionMedication } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{conditionMedicationHelper.condition(conditionMedication)} - {conditionMedicationHelper.tag(conditionMedication)}</h1>
          </div>

          <ConditionMedicationDisplay currentUser={this.props.currentUser} conditionMedication={conditionMedication} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { ConditionMedicationProfilePage }
