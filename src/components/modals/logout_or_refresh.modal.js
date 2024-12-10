import React, { Component } from 'react'
import { useEffect } from 'react';
import { valueHelper } from '@aprexis/aprexis-api-utility'
import moment from 'moment'
import { Col, Container, Form, Row } from 'reactstrap'
import { LogoutOrRefreshModalViewModel } from '../view_models/modals'
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from '../../containers/modals'

const Timer = ({ vm }) => {
  useEffect(() => {
    const interval = setInterval(vm.timer, 1000);

    return () => clearInterval(interval);
  })

  return (
    <div className="timer">
    </div>
  )
}

class LogoutOrRefreshModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new LogoutOrRefreshModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.renderFooter = this.renderFooter.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  renderFooter() {
    return (
      <React.Fragment>
        <button
          className='btn btn-sm btn-secondary mr-auto'
          onClick={() => { this.vm.submitModal(false) }}>
          Logout Now
        </button>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => { this.vm.submitModal(true) }}>
          Stay Logged In
        </button>
      </React.Fragment>
    )
  }

  render() {
    let { expireAt } = this.vm.data
    let timeRemaining = ''

    if (!valueHelper.isValue(expireAt)) {
      timeRemaining = 'unknown'
    } else {
      const now = moment()
      const duration = moment.duration(moment.unix(expireAt).diff(now))
      if (duration.hours() > 0) {
        timeRemaining = `${duration.hours()} hours, `
      }
      if (duration.minutes() > 0) {
        timeRemaining = `${timeRemaining}${duration.minutes()} minutes, `
      }
      timeRemaining = `${timeRemaining}${duration.seconds()} seconds.`
    }

    return (
      <AprexisModal
        {...this.props}
        modalClassName='sign-in-modal'
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={<AprexisModalHeader title='Aprexis Session' />}>
        <Container>
          <Row>
            <Col className='d-flex justify-content-center'>
              <Form>
                <div className='justify-content-center'>
                  <Timer vm={this.vm} />
                  <label>Session will be automatically logged out in</label> {timeRemaining}
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisLogoutOrRefreshModal = aprexisWrapperModal(LogoutOrRefreshModal)
export { aprexisLogoutOrRefreshModal as LogoutOrRefreshModal }
