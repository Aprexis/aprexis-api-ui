import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Address, Contact, Spinner } from "../../../shared"
import { PhysicianProfilePageViewModel } from "../../../view_models/pages/admin/physicians"
import { valueHelper, physicianHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../../helpers"

const PhysicianConfiguration = ({ physician }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.dateDisplay("Provider Last Updated", physicianHelper.providerLastUpdateDate(physician))}
          {displayHelper.display("NPI", physicianHelper.npi(physician))}
          {displayHelper.display("NPI Deactivation Code", physicianHelper.npiDeactivationReasonCode(physician))}
          {displayHelper.dateDisplay("NPI Deactivation Date", physicianHelper.npiDeactivationDate(physician))}
          {displayHelper.dateDisplay("NPI Reactivation Date", physicianHelper.npiReactivationDate(physician))}
          {displayHelper.display("EIN", physicianHelper.einNumber(physician))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PhysicianProfile = ({ physician }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Clinic", physicianHelper.clinic(physician))}
          <Address addressable={physician} />
          <Contact contactable={physician} />
          {displayHelper.phoneDisplay("Business Phone", physicianHelper.businessPhone(physician))}
          {displayHelper.phoneDisplay("Business Fax", physicianHelper.businessFax(physician))}
          {displayHelper.display("Practice Specialy", physicianHelper.practiceSpecialty(physician))}
          {displayHelper.display("Credentials", physicianHelper.credentials(physician))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PhysicianSource = ({ physician }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Source</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Type", physicianHelper.sourceType(physician))}
          {displayHelper.display("Notes", physicianHelper.sourceNotes(physician))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PhysicianUser = ({ physician }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>User</h3>
        </CardTitle>

        <CardBody>
          <Address addressable={physician} prefix="user" />
          <Contact contactable={physician} prefix="user" />
        </CardBody>
      </Card>
    </Col>
  )
}

const PhysicianDisplay = ({ physician }) => {
  if (!valueHelper.isValue(physician)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PhysicianProfile physician={physician} />
        <PhysicianSource physician={physician} />
      </Row>
      <Row>
        <PhysicianConfiguration physician={physician} />
        <PhysicianUser physician={physician} />
      </Row>
    </React.Fragment>
  )
}

class PhysicianProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PhysicianProfilePageViewModel(
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
    const { physician } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{physicianHelper.name(physician)}</h1>
          </div>

          <PhysicianDisplay currentUser={this.props.currentUser} physician={physician} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PhysicianProfilePage }
