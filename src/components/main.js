import React, { Component } from "react"
import { Col, Row } from "reactstrap"
import { Breadcrumbs } from "./"
import { MainRouting } from "./routing"
import { Sidebar } from "./sidebar"
import { DisplayAlert } from "./shared"

class Main extends Component {
  render() {

    return (
      <div className="main main-content sidebar">
        <div className="px-0 mx-0">
          <Row className="pr-0 mx-xs-0">
            <Sidebar {...this.props} />

            <Col className="content pl-1 pt-3 pb-5">
              <DisplayAlert
                clearAlert={this.props.clearAlert}
                modalIsOpen={this.props.modalIsOpen}
                parentType="main" />

              <Breadcrumbs {...this.props} />

              <MainRouting {...this.props} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export { Main }
