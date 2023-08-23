import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { EditButton, Spinner } from '../../shared'
import { MapTalkingPointProfilePageViewModel } from "../../view_models/pages/map_talking_points"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers"

const MapTalkingPointProfile = ({ currentUser, onEditProfile, mapTalkingPoint, vm }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              vm.helper().canEdit(currentUser, mapTalkingPoint) &&
              <EditButton onEdit={(_event) => { onEditProfile(mapTalkingPoint) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Notes", vm.helper().notes(mapTalkingPoint))}
        </CardBody>
      </Card>
    </Col>
  )
}

const MapTalkingPointDisplay = ({ currentUser, onEditProfile, mapTalkingPoint, vm }) => {
  if (!valueHelper.isValue(mapTalkingPoint)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <MapTalkingPointProfile
        currentUser={currentUser}
        onEditProfile={onEditProfile}
        mapTalkingPoint={mapTalkingPoint}
        vm={vm}
      />
    </Row>
  )
}
class MapTalkingPointProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new MapTalkingPointProfilePageViewModel(
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
    const { mapTalkingPoint } = this.state

    return (
      <Container className='map-talking-point-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {this.vm.helper().subject(mapTalkingPoint)} for {this.vm.helper().interventionIdentification(mapTalkingPoint)}
            </h1>
          </div>

          <MapTalkingPointDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editProfileModal}
            mapTalkingPoint={mapTalkingPoint}
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

export { MapTalkingPointProfilePage }
