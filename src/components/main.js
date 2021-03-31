import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import { Breadcrumbs } from './'
import { MainRouting } from './routing'
import { Sidebar } from './sidebar'
import { DisplayAlert } from './shared'

class Main extends Component {
  render() {
    return (
      <div className='main main-content sidebar'>
        <div className="px-0 mx-0">
          <Row className="pr-0 mx-xs-0">
            <Sidebar currentUser={this.props.currentUser} context={this.props.context} />

            <Col className="content pl-1 pt-3 pb-5">
              <DisplayAlert clearAlert={this.props.clearAlert} parentType='main' />

              <Breadcrumbs context={this.props.context} />

              <MainRouting {...this.props} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export { Main }
