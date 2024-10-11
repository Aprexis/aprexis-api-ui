import React, { Component } from "react"
import { Col, Container, Row } from "reactstrap"
import { GoldStandardPageViewModel } from "../../../view_models/pages/admin/gold_standard"

class GoldStandardPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new GoldStandardPageViewModel(
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
    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>Gold Standard</h1>
          </div>

          <Row>
            <Col className="col-sm d-flex">
              <button
                className="btn btn-link ml-0 mr-0 pl-0 pr-0"
                onClick={(_event) => { this.vm.gotoTherapeuticConceptsPage() }}
                type="button">
                Therapeutic Concepts
              </button>
            </Col>
          </Row>
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { GoldStandardPage }
