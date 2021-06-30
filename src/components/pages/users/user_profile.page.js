import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row, UncontrolledTooltip } from 'reactstrap'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AprexisTable, Spinner } from '../../shared'
import { UserProfilePageViewModel } from '../../view_models/pages/users'
import {
  healthPlanHelper,
  patientHelper,
  pharmacyChainHelper,
  pharmacyStoreHelper,
  userHelper,
  valueHelper
} from '../../../helpers'

class UserNpi extends Component {
  render() {
    const { user } = this.props
    if (!userHelper.canHaveNpi(user)) {
      return (<React.Fragment />)
    }

    const { cms_info } = user

    return (
      <Col className="col-sm d-flex">
        <Card className="card flex-fill">
          <CardTitle>
            <h3>User NPI</h3>
          </CardTitle>

          <CardBody>
            <strong className='text-muted'>Pharmacist's NPI:</strong> {userHelper.pharmacistNPI(user)}&nbsp;
            {
              !valueHelper.isValue(cms_info) &&
              <React.Fragment>
                <FontAwesomeIcon className='ml-1 red' icon={faExclamationCircle} id={`invalid-npi-${user.id}`} />
                <UncontrolledTooltip placement="top" boundariesElement="window" target={`invalid-npi-${user.id}`}>
                  User NPI {userHelper.pharmacistNPI(user)} does not appear to be valid.
                </UncontrolledTooltip>
              </React.Fragment>
            }
            <br />
          </CardBody>
        </Card>
      </Col>
    )
  }
}

class UserHealthPlans extends Component {
  constructor(props) {
    super(props)

    this.generateTableData = this.generateTableData.bind(this)
  }

  generateTableData() {
    const { healthPlans } = this.props
    if (!valueHelper.isValue(healthPlans)) {
      return
    }

    return healthPlans.map(
      (healthPlan) => {
        return [
          healthPlanHelper.name(healthPlan),
          healthPlanHelper.code(healthPlan),
          healthPlanHelper.fullAddress(healthPlan),
          healthPlanHelper.phone(healthPlan)
        ]
      }
    )
  }

  render() {
    return (
      <Col className="col-sm d-flex">
        <Card className="card flex-fill">
          <CardTitle>
            <h3>Health Plans</h3>
          </CardTitle>

          <CardBody>
            <AprexisTable
              data={this.generateTableData()}
              headings={['Name', 'Code', 'Address', 'Phone']}
              title=""
            />
          </CardBody>
        </Card>
      </Col>
    )
  }
}

class UserPatient extends Component {
  constructor(props) {
    super(props)

    this.generateTableData = this.generateTableData.bind(this)
  }

  generateTableData() {
    const { patient } = this.props
    if (!valueHelper.isValue(patient)) {
      return
    }

    return [
      [
        patientHelper.name(patient),
        patientHelper.fullAddress(patient),
        patientHelper.phone(patient)
      ]
    ]

  }

  render() {
    return (
      <Col className="col-sm d-flex">
        <Card className="card flex-fill">
          <CardTitle>
            <h3>Patient</h3>
          </CardTitle>

          <CardBody>
            <AprexisTable
              data={this.generateTableData()}
              headings={['Name', 'Address', 'Phone']}
              title=""
            />
          </CardBody>
        </Card>
      </Col>
    )
  }
}

class UserPharmacyChains extends Component {
  constructor(props) {
    super(props)

    this.generateTableData = this.generateTableData.bind(this)
  }

  generateTableData() {
    const { pharmacyChains } = this.props
    if (!valueHelper.isValue(pharmacyChains)) {
      return
    }

    return pharmacyChains.map(
      (pharmacyChain) => {
        return [
          pharmacyChainHelper.name(pharmacyChain),
          pharmacyChainHelper.fullAddress(pharmacyChain),
          pharmacyChainHelper.phone(pharmacyChain)
        ]
      }
    )
  }

  render() {
    return (
      <Col className="col-sm d-flex">
        <Card className="card flex-fill">
          <CardTitle>
            <h3>Pharmacy Chains</h3>
          </CardTitle>

          <CardBody>
            <AprexisTable
              data={this.generateTableData()}
              headings={['Name', 'Address', 'Phone']}
              title=""
            />
          </CardBody>
        </Card>
      </Col>
    )
  }
}

class UserPharmacyStores extends Component {
  constructor(props) {
    super(props)

    this.generateTableData = this.generateTableData.bind(this)
  }

  generateTableData() {
    const { pharmacyStores } = this.props
    if (!valueHelper.isValue(pharmacyStores)) {
      return
    }

    return pharmacyStores.map(
      (pharmacyStore) => {
        return [
          pharmacyStoreHelper.name(pharmacyStore),
          pharmacyStoreHelper.fullAddress(pharmacyStore),
          pharmacyStoreHelper.phone(pharmacyStore)
        ]
      }
    )
  }

  render() {
    return (
      <Col className="col-sm d-flex">
        <Card className="card flex-fill">
          <CardTitle>
            <h3>Pharmacy Stores</h3>
          </CardTitle>

          <CardBody>
            <AprexisTable
              data={this.generateTableData()}
              headings={['Name', 'Address', 'Phone']}
              title=""
            />
          </CardBody>
        </Card>
      </Col>
    )
  }
}

class UserAssociations extends Component {
  render() {
    const { user } = this.props
    if (!valueHelper.isValue(user)) {
      return (<React.Fragment />)
    }

    let associationsCard
    switch (user.role) {
      case 'health_plan_admin':
      case 'health_plan_user':
        associationsCard = (<UserHealthPlans healthPlans={userHelper.healthPlans(user)} />)
        break

      case 'patient_user_role':
        associationsCard = (<UserPatient patient={userHelper.patient(user)} />)
        break

      case 'pharmacy_chain_admin':
        associationsCard = (<UserPharmacyChains pharmacyChains={userHelper.pharmacyChains(user)} />)
        break

      case 'pharmacy_store_admin':
      case 'pharmacy_store_tech':
      case 'pharmacy_store_user':
        associationsCard = (<UserPharmacyStores pharmacyStores={userHelper.pharmacyStores(user)} />)
        break

      default:
      // TODO handle all user types
    }

    return (
      <Col>{associationsCard}</Col>
    )
  }
}

class UserProfile extends Component {
  render() {
    const { user } = this.props
    if (!valueHelper.isValue(user)) {
      return (<React.Fragment />)
    }

    return (
      <Col className="col-sm d-flex">
        <Card className="card flex-fill">
          <CardTitle>
            <h3>User Profile</h3>
          </CardTitle>

          <CardBody>
            <strong className='text-muted'>Username:</strong> {userHelper.username(user)}<br />
            <strong className='text-muted'>Role:</strong> {userHelper.displayRole(user)}<br />
            <strong className='text-muted'>Email:</strong> {userHelper.email(user)}<br />
            <strong className='text-muted'>Phone:</strong> {userHelper.phone(user)}<br />
            <strong className='text-muted'>State:</strong> {userHelper.state(user)}<br />
            <strong className='text-muted'>Timezone:</strong> {userHelper.timeZone(user)}<br />
          </CardBody>
        </Card>
      </Col>
    )
  }
}

class UserProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new UserProfilePageViewModel(
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
    const { user } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>Account for {userHelper.fullName(user)}{userHelper.renderAccess(user)}</h1>
          </div>

          {
            !valueHelper.isValue(user) &&
            <Spinner />
          }

          {
            valueHelper.isValue(user) &&
            <React.Fragment>
              <Row>
                <UserProfile user={user} />
                <UserNpi user={user} />
              </Row>
              <Row>
                <UserAssociations user={user} />
              </Row>
            </React.Fragment>
          }
        </Col>
      </Container>
    )
  }
}

export { UserProfilePage }

