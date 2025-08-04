import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { InterventionVerifyPageViewModel } from '../../view_models/pages/interventions/index.js'
import { interventionHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../helpers/index.js'

function InterventionProfile({ intervention }) {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.notInContextDisplay("health-plans", "Health Plan", interventionHelper.healthPlanName(intervention))}
          {displayHelper.notInContextDisplay("patients", "Patient", interventionHelper.patientName(intervention))}
          {displayHelper.notInContextDisplay("programs", "Program", interventionHelper.programDisplay(intervention))}
          {
            displayHelper.notInContextDisplay(
              "pharmacy-stores",
              "Pharmacy Store",
              interventionHelper.pharmacyStoreDisplay(intervention)
            )
          }
          {displayHelper.display("Pharmacist", interventionHelper.pharmacistDisplay(intervention))}
          {displayHelper.notInContextDisplay("users", "User", interventionHelper.userName(intervention))}
        </CardBody>
      </Card>
    </Col>
  )
}

function Problems({ problems }) {
  if (!Array.isArray(problems)) {
    return (<Row style={{ marginLeft: 6 }}>{problems}</Row>)
  }

  const problemEntries = problems.map((problem, idx) => <Row style={{ marginLeft: 6 }} key={`problem-${idx}`}>{problem}</Row>)
  return (<Container>{problemEntries}</Container>)
}

function ProblemGroup({ problemGroupKey, problemGroup }) {
  const problems = Object.keys(problemGroup).map(
    (problemKey) => {
      return (<Problems key={`problem-${problemGroupKey}-${problemKey}`} problemKey={problemKey} problems={problemGroup[problemKey]} />)
    }
  )

  return (
    <Container>
      <h5>{valueHelper.humanize(problemGroupKey)}</h5>

      {problems}
    </Container>
  )
}

function ProblemGroups({ problemGroups }) {
  const problems = Object.keys(problemGroups).map(
    (problemGroupKey) => {
      return (<ProblemGroup key={`problem-group-${problemGroupKey}`} problemGroupKey={problemGroupKey} problemGroup={problemGroups[problemGroupKey]} />)
    }
  )

  return (
    <React.Fragment>
      {problems}
    </React.Fragment>
  )
}

function AdministratorProblems({ problemGroups }) {
  return (
    <Container>
      <h4>Problems Requiring Aprexis Administrator</h4>

      <ProblemGroups problemGroups={problemGroups} />
    </Container>
  )
}

function PharmacistProblems({ problemGroups }) {
  return (
    <Container>
      <h4>Problems Pharmacist Can Address</h4>

      <ProblemGroups problemGroups={problemGroups} />
    </Container>
  )
}

function InterventionProblems({ verification }) {
  const notReady = verification.not_ready
  const problems = Object.keys(notReady).map(
    (verificationKey) => {
      switch (verificationKey) {
        case 'aprexis_admin':
          return (<AdministratorProblems key='administrator-problems' problemGroups={notReady[verificationKey]} />)

        case 'pharmacist':
          return (<PharmacistProblems key='pharmacist-problems' problemGroups={notReady[verificationKey]} />)

        default:
          return (
            <Row key={`unknown-${verificationKey}`}>{valueHelper.humanize(verificationKey)} is unknown</Row>
          )
      }
    }
  )

  return (
    <React.Fragment>
      {problems}
    </React.Fragment>
  )
}


function InterventionVerification({ verification }) {
  if (!valueHelper.isValue(verification) || !valueHelper.isValue(verification.not_ready)) {
    return null
  }

  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Problems</h3>
        </CardTitle>

        <CardBody>
          <InterventionProblems verification={verification} />
        </CardBody>
      </Card>
    </Col>
  )
}

class InterventionVerifyPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new InterventionVerifyPageViewModel(
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
    const { intervention, verification } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>Verify Intervention</h1>
          </div>

          <Row>
            <InterventionProfile intervention={intervention} />
          </Row>

          <Row>
            <InterventionVerification verification={verification} />
          </Row>
        </Col>
      </Container >
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { InterventionVerifyPage }
