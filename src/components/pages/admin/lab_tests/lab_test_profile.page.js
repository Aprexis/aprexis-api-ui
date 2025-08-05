import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from "../../../shared/index.js"
import { LabTestProfilePageViewModel } from "../../../view_models/pages/admin/lab_tests/index.js"
import { valueHelper, labTestHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../../helpers/index.js"

const LabTestProfile = ({ labTest }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Key Code", labTestHelper.keyCode(labTest))}
          {displayHelper.display("Name", labTestHelper.name(labTest))}
          {displayHelper.display("Category", labTestHelper.category(labTest))}
          {displayHelper.booleanDisplay("Vital", labTestHelper.vital(labTest))}
          {displayHelper.display("Units", labTestHelper.units(labTest))}
          {displayHelper.display("Normal Value", labTestHelper.normalValue(labTest))}
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

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { LabTestProfilePage }
