import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row, UncontrolledTooltip } from 'reactstrap'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AprexisTable, Spinner } from '../../shared'
import { UserProfilePageViewModel } from '../../view_models/pages/users'
import { userHelper, valueHelper } from '../../../helpers'

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
            <strong className='text-muted'>Pharmacist's NPI:</strong> {user.pharmacist_npi}&nbsp;
            {
              !valueHelper.isValue(cms_info) &&
              <React.Fragment>
                <FontAwesomeIcon className='ml-1 red' icon={faExclamationCircle} id={`invalid-npi-${user.id}`} />
                <UncontrolledTooltip placement="top" boundariesElement="window" target={`invalid-npi-${user.id}`}>
                  User NPI {user.pharmacist_npi} does not appear to be valid.
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
          healthPlan.name,
          healthPlan.code,
          healthPlan.address,
          healthPlan.city,
          healthPlan.state,
          healthPlan.zip_code,
          healthPlan.phone
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
              headings={['Name', 'Code', 'Address', 'City', 'State', 'ZIP Code', 'Phone']}
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
        patient.name,
        patient.address,
        patient.city,
        patient.state,
        patient.zip_code,
        patient.phone
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
              headings={['Name', 'Address', 'City', 'State', 'ZIP Code', 'Phone']}
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
          pharmacyChain.name,
          pharmacyChain.address,
          pharmacyChain.city,
          pharmacyChain.state,
          pharmacyChain.zip_code,
          pharmacyChain.phone
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
              headings={['Name', 'Address', 'City', 'State', 'ZIP Code', 'Phone']}
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
          pharmacyStore.name,
          pharmacyStore.address,
          pharmacyStore.city,
          pharmacyStore.state,
          pharmacyStore.zip_code,
          pharmacyStore.phone
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
              headings={['Name', 'Address', 'City', 'State', 'ZIP Code', 'Phone']}
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
        associationsCard = (<UserHealthPlans healthPlans={user.health_plans} />)
        break

      case 'patient_user_role':
        associationsCard = (<UserPatient patient={user.patient} />)
        break

      case 'pharmacy_chain_admin':
        associationsCard = (<UserPharmacyChains pharmacyChains={user.pharmacies} />)
        break

      case 'pharmacy_store_admin':
      case 'pharmacy_store_tech':
      case 'pharmacy_store_user':
        associationsCard = (<UserPharmacyStores pharmacyStores={user.pharmacy_stores} />)
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
            <strong className='text-muted'>Username:</strong> {user.username}<br />
            <strong className='text-muted'>Role:</strong> {userHelper.displayRole(user)}<br />
            <strong className='text-muted'>Email:</strong> {user.email}<br />
            <strong className='text-muted'>Phone:</strong> {user.phone}<br />
            <strong className='text-muted'>State:</strong> {user.state}<br />
            <strong className='text-muted'>Timezone:</strong> {user.time_zone}<br />
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

