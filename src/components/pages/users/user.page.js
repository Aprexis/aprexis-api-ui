import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row, UncontrolledTooltip } from 'reactstrap'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spinner } from '../../shared'
import { UserPageViewModel } from '../../view_models/pages/users'
import { pathHelper, userHelper, valueHelper } from '../../../helpers'

class UserNpi extends Component {
  render() {
    const { user } = this.props
    if (!userHelper.canHaveNpi(user)) {
      return
    }

    const { cms_info } = user

    return (
      <Col className="col-sm d-flex">
        <Card className="card flex-fill">
          <CardTitle>
            User NPI
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
class UserProfile extends Component {
  render() {
    const { user } = this.props

    return (
      <Col className="col-sm d-flex">
        <Card className="card flex-fill">
          <CardTitle>
            User Profile
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

class UserAssociations extends Component {
  constructor(props) {
    super(props)

    this.renderPharmacyChainAdmin = this.renderPharmacyChainAdmin.bind(this)
  }

  render() {
    const { user } = this.props
    let associationsCard
    switch (user.role) {
      case 'pharmacy_chain_admin':
        associationsCard = this.renderPharmacyChainAdmin(user)
        break

      default:
      // TODO handle all user types
    }

    return (
      <Col>{associationsCard}</Col>
    )
  }

  renderPharmacyChainAdmin(user) {
    // TODO fetch the pharmacy chains.
    return
  }
}

class UserPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new UserPageViewModel(
      {
        pathEntries: pathHelper.parsePathEntries(window.location),
        ...this.props,
        view: this
      }
    )
  }

  componentDidMount() {
    this.vm.loadData(window.location)
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

export { UserPage }

