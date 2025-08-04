import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared/index.js'
import { ProductProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/products/index.js'
import { goldStandardProductHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers/index.js'

const ProductProfile = ({ product, onMarketedProduct }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Product Name (Short)", goldStandardProductHelper.productNameShort(product))}
          {
            displayHelper.display(
              "Marketed Product",
              goldStandardProductHelper.goldStandardMarketedProductName(product),
              '',
              ':',
              false,
              onMarketedProduct
            )
          }
          {displayHelper.display("NDC-9", goldStandardProductHelper.ndc9(product))}
          {displayHelper.display("Brand Generic Status", goldStandardProductHelper.goldStandardBrandGenericStatusName(product))}
          {displayHelper.display("Legend Status", goldStandardProductHelper.goldStandardLegendStatusName(product))}
          {displayHelper.display("CP-Num", goldStandardProductHelper.cpNum(product))}
          {displayHelper.display("E-Prescribing Name", goldStandardProductHelper.ePrescribingName(product))}
          {displayHelper.booleanDisplay("Bulk Chemical", goldStandardProductHelper.bulkChemical(product))}
        </CardBody>
      </Card>
    </Col>
  )
}

const ProductMarketing = ({ product }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Marketing</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.dateDisplay("On Market", goldStandardProductHelper.productOnMarketDate(product))}
          {displayHelper.booleanDisplay("Innovator", goldStandardProductHelper.innovator(product))}
          {displayHelper.booleanDisplay("Private Label", goldStandardProductHelper.privateLabel(product))}
          {displayHelper.booleanDisplay("Repackaged", goldStandardProductHelper.repackaged(product))}
          {displayHelper.dateDisplay("Off Market", goldStandardProductHelper.offMarketDate(product))}
          {displayHelper.display("Replaced By", goldStandardProductHelper.goldStandardReplacedByProductNameLong(product))}
        </CardBody>
      </Card>
    </Col>
  )
}

const ProductDisplay = ({ product, onMarketedProduct }) => {
  if (!valueHelper.isValue(product)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <ProductProfile product={product} onMarketedProduct={onMarketedProduct} />
        <ProductMarketing product={product} />
      </Row>
    </React.Fragment>
  )
}

class ProductProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ProductProfilePageViewModel(
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
    const { product } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardProductHelper.productNameLong(product)}</h1>
          </div>

          <ProductDisplay
            currentUser={this.props.currentUser}
            product={product}
            onMarketedProduct={() => { this.vm.gotoMarketedProduct(product) }}
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

export { ProductProfilePage }
