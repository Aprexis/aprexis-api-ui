import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from "../../../shared"
import { DiseaseProfilePageViewModel } from "../../../view_models/pages/admin/diseases"
import { fieldHelper, valueHelper } from "../../../../helpers"
import { diseaseHelper } from "../../../../helpers/admin"

const DiseaseProfile = ({ disease }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("Name", diseaseHelper.name(disease))}
          {fieldHelper.display("Description", diseaseHelper.description(disease))}
        </CardBody>
      </Card>
    </Col>
  )
}

const DiseaseDisplay = ({ currentUser, disease }) => {
  if (!valueHelper.isValue(disease)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <DiseaseProfile disease={disease} />
      </Row>
    </React.Fragment>
  )
}

class DiseaseProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DiseaseProfilePageViewModel(
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
    const { disease } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{diseaseHelper.questionKey(disease)}</h1>
          </div>

          <DiseaseDisplay currentUser={this.props.currentUser} disease={disease} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { DiseaseProfilePage }
