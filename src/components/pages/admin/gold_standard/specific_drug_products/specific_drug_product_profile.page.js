import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared/index.js'
import { SpecificDrugProductProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/specific_drug_products/index.js'
import { goldStandardSpecificDrugProductHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers/index.js'

const SpecificDrugProductProfile = ({ specificDrugProduct, onGenericProduct }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Synonym", goldStandardSpecificDrugProductHelper.synonym(specificDrugProduct))}
          {
            displayHelper.display(
              "Generic Product",
              goldStandardSpecificDrugProductHelper.goldStandardGenericProductName(specificDrugProduct),
              '',
              ':',
              false,
              onGenericProduct
            )
          }
        </CardBody>
      </Card>
    </Col>
  )
}

const SpecificDrugProductDisplay = ({ specificDrugProduct, onGenericProduct }) => {
  if (!valueHelper.isValue(specificDrugProduct)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <SpecificDrugProductProfile specificDrugProduct={specificDrugProduct} onGenericProduct={onGenericProduct} />
      </Row>
    </React.Fragment>
  )
}

class SpecificDrugProductProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new SpecificDrugProductProfilePageViewModel(
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
    const { specificDrugProduct } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardSpecificDrugProductHelper.name(specificDrugProduct)}</h1>
          </div>

          <SpecificDrugProductDisplay
            currentUser={this.props.currentUser}
            specificDrugProduct={specificDrugProduct}
            onGenericProduct={() => { this.vm.gotoGenericProduct(specificDrugProduct) }}
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

export { SpecificDrugProductProfilePage }
