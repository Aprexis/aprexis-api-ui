import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { EditButton, Spinner } from '../../shared'
import { LabTestValueProfilePageViewModel } from "../../view_models/pages/lab_test_values"
import { fieldHelper, valueHelper } from "../../../helpers"

const LabTestValueProfile = ({ currentUser, onEditProfile, labTestValue, vm }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              vm.helper().canEdit(currentUser, labTestValue) &&
              <EditButton onEdit={(_event) => { onEditProfile(labTestValue) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("Type", vm.helper().displayType(labTestValue))}
          {fieldHelper.display("Intervention", vm.helper().interventionIdentification(labTestValue))}
          {fieldHelper.display("Pharmacy Store", vm.helper().pharmacyStoreIdentification(labTestValue))}
          {fieldHelper.display("User", vm.helper().userFullName(labTestValue))}
          {fieldHelper.dateTimeDisplay("Value Taken At", vm.helper().valueTakenAt(labTestValue))}
          {fieldHelper.display("Value", vm.helper().value(labTestValue))}
          {fieldHelper.booleanDisplay("Calculated", vm.helper().calculated(labTestValue))}
          {fieldHelper.booleanDisplay("Confirmed", vm.helper().confirmed(labTestValue))}
        </CardBody>
      </Card>
    </Col>
  )
}

const LabTestValueDisplay = ({ currentUser, onEditProfile, labTestValue, vm }) => {
  if (!valueHelper.isValue(labTestValue)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <LabTestValueProfile
        currentUser={currentUser}
        onEditProfile={onEditProfile}
        labTestValue={labTestValue}
        vm={vm}
      />
    </Row>
  )
}
class LabTestValueProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new LabTestValueProfilePageViewModel(
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
    const { labTestValue } = this.state

    return (
      <Container className='lab-test-value-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {this.vm.helper().labTestFullName(labTestValue)} for {this.vm.helper().patientName(labTestValue)}
            </h1>
          </div>

          <LabTestValueDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editProfileModal}
            labTestValue={labTestValue}
            vm={this.vm}
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

export { LabTestValueProfilePage }
