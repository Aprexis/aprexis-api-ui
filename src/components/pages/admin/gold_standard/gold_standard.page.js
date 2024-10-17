import React, { Component } from "react"
import { Col, Container } from "reactstrap"
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

          <table>
            <tbody>
              <tr>
                <td>
                  <button
                    className="btn btn-link ml-0 mr-0 pl-0 pr-0"
                    onClick={(_event) => { this.vm.gotoTherapeuticConceptsPage() }}
                    type="button">
                    Therapeutic Concepts
                  </button>
                </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <button
                            className="btn btn-link ml-0 mr-0 pl-0 pr-0"
                            onClick={(_event) => { this.vm.gotoGenericProductClinicalsPage() }}
                            type="button">
                            Generic Product Clinicals
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            className="btn btn-link ml-0 mr-0 pl-0 pr-0"
                            onClick={(_event) => { this.vm.gotoGenericProductsPage() }}
                            type="button">
                            Generic Products
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            className="btn btn-link ml-0 mr-0 pl-0 pr-0"
                            onClick={(_event) => { this.vm.gotoSpecificDrugProductsPage() }}
                            type="button">
                            Specific Drug Products
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            className="btn btn-link ml-0 mr-0 pl-0 pr-0"
                            onClick={(_event) => { this.vm.gotoSpecificProductsPage() }}
                            type="button">
                            Specific Products
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            className="btn btn-link ml-0 mr-0 pl-0 pr-0"
                            onClick={(_event) => { this.vm.gotoMarketedProductsPage() }}
                            type="button">
                            Markteted Products
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            className="btn btn-link ml-0 mr-0 pl-0 pr-0"
                            onClick={(_event) => { this.vm.gotoProductsPage() }}
                            type="button">
                            Products
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            className="btn btn-link ml-0 mr-0 pl-0 pr-0"
                            onClick={(_event) => { this.vm.gotoPackagesPage() }}
                            type="button">
                            Packages
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
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
