import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from "../../../shared"
import { DiagnosisCodeProfilePageViewModel } from "../../../view_models/pages/admin/diagnosis_codes"
import { fieldHelper, valueHelper } from "../../../../helpers"
import { diagnosisCodeHelper } from "../../../../helpers/admin"
import { diagnosisCodes } from "../../../../types"

const DiagnosisCodeProfile = ({ diagnosisCode }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("Type", diagnosisCodes[diagnosisCode.type])}
          {fieldHelper.display("Code", diagnosisCode.code)}
          {fieldHelper.display("Short Description", diagnosisCode.short_description)}
          {fieldHelper.display("Long Description", diagnosisCode.long_description)}
          {fieldHelper.booleanDisplay("Billable", diagnosisCode.billable)}
        </CardBody>
      </Card>
    </Col>
  )
}

const DiagnosisCodeDisplay = ({ currentUser, diagnosisCode }) => {
  if (!valueHelper.isValue(diagnosisCode)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <DiagnosisCodeProfile diagnosisCode={diagnosisCode} />
      </Row>
    </React.Fragment>
  )
}

class DiagnosisCodeProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DiagnosisCodeProfilePageViewModel(
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
    const { diagnosisCode } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{diagnosisCodeHelper.code(diagnosisCode)}</h1>
          </div>

          <DiagnosisCodeDisplay currentUser={this.props.currentUser} diagnosisCode={diagnosisCode} />
        </Col>
      </Container>
    )
  }
}

export { DiagnosisCodeProfilePage }
