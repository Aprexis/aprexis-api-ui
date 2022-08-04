import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Address, Contact, EditButton, Spinner } from '../../shared'
import { CaregiverProfilePageViewModel } from "../../view_models/pages/caregivers"
import { caregiverHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers"

const CaregiverProfile = ({ currentUser, onEditProfile, caregiver }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              caregiverHelper.canEdit(currentUser, caregiver) &&
              <EditButton onEdit={(_event) => { onEditProfile(caregiver) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.booleanDisplay("Current", caregiverHelper.isCurrentCaregiver(caregiver))}
          {displayHelper.display("Relationship", caregiverHelper.relationship(caregiver))}
          {displayHelper.booleanDisplay("Use Patient Address", caregiverHelper.usePatientAddress(caregiver))}
          <Address addressable={caregiver} />
          <Contact contactable={caregiver} />
        </CardBody>
      </Card>
    </Col>
  )
}

const CaregiverDisplay = ({ currentUser, onEditProfile, caregiver }) => {
  if (!valueHelper.isValue(caregiver)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <CaregiverProfile
        currentUser={currentUser}
        onEditProfile={onEditProfile}
        caregiver={caregiver}
      />
    </Row>
  )
}
class CaregiverProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new CaregiverProfilePageViewModel(
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
    const { caregiver } = this.state

    return (
      <Container className='caregiver-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {caregiverHelper.name(caregiver)}
            </h1>
          </div>

          <CaregiverDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editProfileModal}
            caregiver={caregiver}
          />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { CaregiverProfilePage }
