import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared'
import { DrugItemProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/drug_items'
import { goldStandardDrugItemHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers'

const DrugItemProfile = ({ drugItem, onProduct }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {
            displayHelper.display(
              "Product",
              goldStandardDrugItemHelper.goldStandardProductNameLong(drugItem),
              '',
              ':',
              false,
              onProduct
            )
          }
          {displayHelper.display("Form", goldStandardDrugItemHelper.goldStandardGsFormName(drugItem))}
          {displayHelper.display("FDA Form ID", goldStandardDrugItemHelper.goldStandardFdaFormId(drugItem))}
          {displayHelper.display("Implicit Route ID", goldStandardDrugItemHelper.goldStandardImplicitRouteId(drugItem))}
          {displayHelper.display("Specific Drug Item ID", goldStandardDrugItemHelper.goldStandardSpecificDrugItemId(drugItem))}
        </CardBody>
      </Card>
    </Col>
  )
}

const DrugItemDisplay = ({ drugItem, onProduct }) => {
  if (!valueHelper.isValue(drugItem)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <DrugItemProfile drugItem={drugItem} onProduct={onProduct} />
      </Row>
    </React.Fragment>
  )
}

class DrugItemProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DrugItemProfilePageViewModel(
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
    const { drugItem } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardDrugItemHelper.itemNameLong(drugItem)}</h1>
          </div>

          <DrugItemDisplay
            currentUser={this.props.currentUser}
            drugItem={drugItem}
            onProduct={() => { this.vm.gotoProduct(drugItem) }}
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

export { DrugItemProfilePage }
