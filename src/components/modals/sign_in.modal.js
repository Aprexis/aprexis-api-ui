import React, { Component } from 'react'
import { Col, Container, Form, Row } from 'reactstrap'
import { SignInModalViewModel } from '../view_models/modals/index.js'
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from '../../containers/modals/index.js'
import { UsernamePassword } from './shared/index.js'

class SignInModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new SignInModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.renderFooter = this.renderFooter.bind(this)
  }

  renderFooter() {
    const { clearModal, toggleModal } = this.props

    return (
      <React.Fragment>
        <button
          className='btn btn-sm btn-secondary mr-auto'
          onClick={(_event) => { toggleModal(clearModal) }}>
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
