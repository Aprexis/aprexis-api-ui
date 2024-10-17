import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared'
import { MarketedProductProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/marketed_products'
import { goldStandardMarketedProductHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers'

const MarketedProductProfile = ({ marketedProduct, onSpecificProduct }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {
            displayHelper.display(
              "Specific Product",
              goldStandardMarketedProductHelper.goldStandardSpecificProductName(marketedProduct),
              '',
              ':',
              false,
              onSpecificProduct
            )
          }
          {displayHelper.booleanDisplay("Brand", goldStandardMarketedProductHelper.brand(marketedProduct))}
          {displayHelper.booleanDisplay("Repackaged", goldStandardMarketedProductHelper.repackaged(marketedProduct))}
        </CardBody>
      </Card>
    </Col>
  )
}

const MarketedProductDisplay = ({ marketedProduct, onSpecificProduct }) => {
  if (!valueHelper.isValue(marketedProduct)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <MarketedProductProfile marketedProduct={marketedProduct} onSpecificProduct={onSpecificProduct} />
      </Row>
    </React.Fragment>
  )
}

class MarketedProductProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new MarketedProductProfilePageViewModel(
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
    const { marketedProduct } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardMarketedProductHelper.name(marketedProduct)}</h1>
          </div>

          <MarketedProductDisplay
            currentUser={this.props.currentUser}
            marketedProduct={marketedProduct}
            onSpecificProduct={() => { this.vm.gotoSpecificProduct(marketedProduct) }}
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

export { MarketedProductProfilePage }
