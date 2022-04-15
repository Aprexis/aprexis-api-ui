import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Address, Contact, Spinner } from "../../../shared"
import { PhysicianProfilePageViewModel } from "../../../view_models/pages/admin/physicians"
import { fieldHelper, valueHelper } from "../../../../helpers"
import { physicianHelper } from "../../../../helpers/admin"

const PhysicianConfiguration = ({ physician }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.dateDisplay("Provider Last Updated", physicianHelper.providerLastUpdateDate(physician))}
          {fieldHelper.display("NPI", physicianHelper.npi(physician))}
          {fieldHelper.display("NPI Deactivation Code", physicianHelper.npiDeactivationReasonCode(physician))}
          {fieldHelper.dateDisplay("NPI Deactivation Date", physicianHelper.npiDeactivationDate(physician))}
          {fieldHelper.dateDisplay("NPI Reactivation Date", physicianHelper.npiReactivationDate(physician))}
          {fieldHelper.display("EIN", physicianHelper.einNumber(physician))}
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
          {fieldHelper.display("Clinic", physicianHelper.clinic(physician))}
          <Address addressable={physician} />
          <Contact contactable={physician} />
          {fieldHelper.phoneDisplay("Business Phone", physicianHelper.businessPhone(physician))}
          {fieldHelper.phoneDisplay("Business Fax", physicianHelper.businessFax(physician))}
          {fieldHelper.display("Practice Specialy", physicianHelper.practiceSpecialty(physician))}
          {fieldHelper.display("Credentials", physicianHelper.credentials(physician))}
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
          {fieldHelper.display("Type", physicianHelper.sourceType(physician))}
          {fieldHelper.display("Notes", physicianHelper.sourceNotes(physician))}
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

const PhysicianDisplay = ({ currentUser, physician }) => {
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

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PhysicianProfilePage }
