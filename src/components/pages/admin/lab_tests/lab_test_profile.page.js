import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from "../../../shared"
import { LabTestProfilePageViewModel } from "../../../view_models/pages/admin/lab_tests"
import { fieldHelper, valueHelper } from "../../../../helpers"
import { labTestHelper } from "../../../../helpers/admin"

const LabTestProfile = ({ labTest }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("Key Code", labTestHelper.keyCode(labTest))}
          {fieldHelper.display("Name", labTestHelper.name(labTest))}
          {fieldHelper.display("Category", labTestHelper.category(labTest))}
          {fieldHelper.booleanDisplay("Vital", labTestHelper.vital(labTest))}
          {fieldHelper.display("Units", labTestHelper.units(labTest))}
          {fieldHelper.display("Normal Value", labTestHelper.normalValue(labTest))}
        </CardBody>
      </Card>
    </Col>
  )
}

const LabTestDisplay = ({ currentUser, labTest }) => {
  if (!valueHelper.isValue(labTest)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <LabTestProfile labTest={labTest} />
      </Row>
    </React.Fragment>
  )
}

class LabTestProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new LabTestProfilePageViewModel(
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
    const { labTest } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{labTestHelper.fullName(labTest)}</h1>
          </div>

          <LabTestDisplay currentUser={this.props.currentUser} labTest={labTest} />
        </Col>
      </Container>
    )
  }
}

export { LabTestProfilePage }
