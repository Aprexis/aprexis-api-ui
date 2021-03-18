import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row, UncontrolledTooltip } from 'reactstrap'
import { faLock, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spinner } from '../../shared'
import { UserPageViewModel } from '../../view_models/pages/users'
import { pathHelper, userHelper, valueHelper } from '../../../helpers'

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.renderAccess = this.renderAccess.bind(this)
    this.renderAccessLocked = this.renderAccessLocked.bind(this)
    this.renderAllowLogin = this.renderAllowLogin.bind(this)
  }

  render() {
    const { user } = this.props

    return (
      <Col className="col-sm d-flex">
        <Card className="card flex-fill">
          <CardTitle>
            User Profile
            </CardTitle>

          <CardBody>
            <h1>{userHelper.fullName(user)}{this.renderAccess(user)}</h1>
            {user.email}<br />
            {userHelper.displayRole(user)}<br />
          </CardBody>
        </Card>
      </Col>
    )
  }

  renderAccess(user) {
    const accessLocked = this.renderAccessLocked(user)
    const allowLogin = this.renderAllowLogin(user)

    return (<React.Fragment>{accessLocked}{allowLogin}</React.Fragment>)
  }

  renderAccessLocked(user) {
    if (!valueHelper.isSet(user.access_locked)) {
      return
    }

    return (
      <span>
        &nbsp;
        <FontAwesomeIcon className='ml-1' icon={faLock} id={`access-locked-${user.id}`} />
        <UncontrolledTooltip placement="top" boundariesElement="window" target={`access-locked-${user.id}`}>
          Account is temporarily locked
        </UncontrolledTooltip>
      </span>
    )
  }

  renderAllowLogin(user) {
    if (valueHelper.isSet(user.allow_login)) {
      return
    }

    return (
      <span>
        &nbsp;
        <FontAwesomeIcon className='ml-1' icon={faUserSlash} id={`disallow-login-${user.id}`} />
        <UncontrolledTooltip placement="top" boundariesElement="window" target={`disallow-login-${user.id}`}>
          Login not allowed
        </UncontrolledTooltip>
      </span>
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
            <h1>Account</h1>
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

