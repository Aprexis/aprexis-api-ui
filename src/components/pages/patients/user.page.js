import React, { Component } from 'react'
import { Container, Col } from 'reactstrap'
import { userHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { Spinner, UserProfile } from '../../shared'
import { UserPageViewModel } from '../../view_models/pages/patients'
import { displayHelper } from '../../../helpers'

class UserPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new UserPageViewModel(
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
            <h1>Account for {userHelper.fullName(user)}{displayHelper.renderAccess(user)}</h1>
          </div>

          {
            !valueHelper.isValue(user) &&
            <Spinner />
          }

          {
            valueHelper.isValue(user) &&
            <UserProfile user={user} />
          }
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { UserPage }
