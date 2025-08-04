import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared/index.js'
import { GenericProductProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/generic_products/index.js'
import { goldStandardGenericProductHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers/index.js'

const GenericProductProfile = ({ genericProduct, onGenericProductClinical }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Synonym", goldStandardGenericProductHelper.synonym(genericProduct))}
          {
            displayHelper.display(
              "Generic Product Clinical",
              goldStandardGenericProductHelper.goldStandardGenericProductClinicalName(genericProduct),
              '',
              ':',
              false,
              onGenericProductClinical
            )
          }
        </CardBody>
      </Card>
    </Col>
  )
}

const GenericProductDisplay = ({ genericProduct, onGenericProductClinical }) => {
  if (!valueHelper.isValue(genericProduct)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <GenericProductProfile genericProduct={genericProduct} onGenericProductClinical={onGenericProductClinical} />
      </Row>
    </React.Fragment>
  )
}

class GenericProductProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new GenericProductProfilePageViewModel(
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
    const { genericProduct } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardGenericProductHelper.name(genericProduct)}</h1>
          </div>

          <GenericProductDisplay
            currentUser={this.props.currentUser}
            genericProduct={genericProduct}
            onGenericProductClinical={() => { this.vm.gotoGenericProductClinical(genericProduct) }}
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

export { GenericProductProfilePage }
