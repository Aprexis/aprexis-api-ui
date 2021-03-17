import React, { Component } from 'react'
import { Col, Container, Form, Row } from 'reactstrap'
import { SignInModalViewModel } from '../view_models/modals'
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from '../../containers/modals'
import { pathHelper } from '../../helpers'
import { UsernamePassword } from './shared'

class SignInModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new SignInModalViewModel(
      {
        pathEntries: pathHelper.parsePathEntries(window.location),
        ...this.props,
        view: this
      }
    )

    this.renderFooter = this.renderFooter.bind(this)
  }

  renderFooter() {
    return (
      <React.Fragment>
        <button
          className='btn btn-sm btn-secondary mr-auto'
          onClick={this.vm.clearModal}>
          Cancel
        </button>
        <button
          className='btn btn-sm btn-primary'
          onClick={this.vm.submitModal}>
          Sign-In
        </button>
      </React.Fragment>
    )
  }

  render() {
    const { password, username } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName='sign-in-modal'
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={<AprexisModalHeader title='Aprexis Sign-In' />}>
        <Container>
          <Row>
            <Col className='d-flex justify-content-center'>
              <Form>
                <div className='justify-content-center'>
                  <UsernamePassword
                    changeField={this.vm.setFieldFromEvent}
                    inputClassName='sign-in-input'
                    password={password}
                    username={username}
                  />
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }
}

const aprexisSignInModal = aprexisWrapperModal(SignInModal)
export { aprexisSignInModal as SignInModal }
