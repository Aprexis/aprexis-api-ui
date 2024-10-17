import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared'
import { SpecificProductProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/specific_products'
import { goldStandardSpecificProductHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers'

const SpecificProductProfile = ({ specificProduct, onSpecificDrugProduct }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Synonym", goldStandardSpecificProductHelper.synonym(specificProduct))}
          {
            displayHelper.display(
              "Specific Drug Product",
              goldStandardSpecificProductHelper.goldStandardSpecificDrugProductName(specificProduct),
              '',
              ':',
              false,
              onSpecificDrugProduct
            )
          }
        </CardBody>
      </Card>
    </Col>
  )
}

const SpecificProductDisplay = ({ specificProduct, onSpecificDrugProduct }) => {
  if (!valueHelper.isValue(specificProduct)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <SpecificProductProfile specificProduct={specificProduct} onSpecificDrugProduct={onSpecificDrugProduct} />
      </Row>
    </React.Fragment>
  )
}

class SpecificProductProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new SpecificProductProfilePageViewModel(
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
    const { specificProduct } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardSpecificProductHelper.name(specificProduct)}</h1>
          </div>

          <SpecificProductDisplay
            currentUser={this.props.currentUser}
            specificProduct={specificProduct}
            onSpecificDrugProduct={() => { this.vm.gotoSpecificDrugProduct(specificProduct) }}
          />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SpecificProductProfilePage }
