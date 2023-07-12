import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../shared'
import { ProgramProfilePageViewModel } from '../../view_models/pages/programs'
import { programHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../helpers'


const ProgramConfiguration = ({ program }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Kind", programHelper.kind(program))}
          {displayHelper.display("Type", programHelper.type(program))}
          {displayHelper.booleanDisplay("Active", programHelper.active(program))}
          {displayHelper.dateDisplay("Start Date", programHelper.startDate(program))}
          {displayHelper.dateDisplay("End Date", programHelper.endDate(program))}
        </CardBody>
      </Card>
    </Col>
  )
}

const ProgramProfile = ({ program }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Active Interventions", programHelper.numberActiveInterventions(program))}
          {displayHelper.display("Dry Runs", programHelper.numberDryRuns(program))}
        </CardBody>
      </Card>
    </Col>
  )
}

const ProgramDisplay = ({ program }) => {
  if (!valueHelper.isValue(program)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <ProgramConfiguration program={program} />
        <ProgramProfile program={program} />
      </Row>
    </React.Fragment>
  )
}

class ProgramProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ProgramProfilePageViewModel(
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
    const { program } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{programHelper.name(program)}</h1>
          </div>

          <ProgramDisplay currentUser={this.props.currentUser} program={program} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { ProgramProfilePage }
