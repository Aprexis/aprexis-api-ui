import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from "../../../shared/index.js"
import { PotentiallyInappropriateMedicationProfilePageViewModel } from "../../../view_models/pages/admin/potentially_inappropriate_medications/index.js"
import { valueHelper, potentiallyInappropriateMedicationHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../../helpers/index.js"

const PotentiallyInappropriateMedicationProfile = ({ potentiallyInappropriateMedication }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Synonym", potentiallyInappropriateMedicationHelper.specificProductSynonym(potentiallyInappropriateMedication))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PotentiallyInappropriateMedicationDisplay = ({ potentiallyInappropriateMedication }) => {
  if (!valueHelper.isValue(potentiallyInappropriateMedication)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PotentiallyInappropriateMedicationProfile potentiallyInappropriateMedication={potentiallyInappropriateMedication} />
      </Row>
    </React.Fragment>
  )
}

class PotentiallyInappropriateMedicationProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PotentiallyInappropriateMedicationProfilePageViewModel(
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
    const { potentiallyInappropriateMedication } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{potentiallyInappropriateMedicationHelper.specificProductName(potentiallyInappropriateMedication)}</h1>
          </div>

          <PotentiallyInappropriateMedicationDisplay currentUser={this.props.currentUser} potentiallyInappropriateMedication={potentiallyInappropriateMedication} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PotentiallyInappropriateMedicationProfilePage }
