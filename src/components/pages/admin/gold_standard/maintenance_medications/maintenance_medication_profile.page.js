import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared/index.js'
import { MaintenanceMedicationProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/maintenance_medications/index.js'
import { goldStandardMaintenanceMedicationHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers/index.js'

const MaintenanceMedicationProfile = ({ maintenanceMedication, onMarketedProduct, onProduct, onPackage, onSpecificProduct }) => {
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
              goldStandardMaintenanceMedicationHelper.goldStandardSpecificProductName(maintenanceMedication),
              '',
              ':',
              false,
              onSpecificProduct
            )
          }
          {
            displayHelper.display(
              "Marketed Product",
              goldStandardMaintenanceMedicationHelper.goldStandardMarketedProductName(maintenanceMedication),
              '',
              ':',
              false,
              onMarketedProduct
            )
          }
          {
            displayHelper.display(
              "Product",
              goldStandardMaintenanceMedicationHelper.goldStandardProductNameLong(maintenanceMedication),
              '',
              ':',
              false,
              onProduct
            )
          }
          {
            displayHelper.display(
              "Package",
              goldStandardMaintenanceMedicationHelper.goldStandardPackageDescription(maintenanceMedication),
              '',
              ':',
              false,
              onPackage
            )
          }
        </CardBody>
      </Card>
    </Col>
  )
}

const MaintenanceMedicationDisplay = ({ maintenanceMedication, onMarketedProduct, onProduct, onPackage, onSpecificProduct }) => {
  if (!valueHelper.isValue(maintenanceMedication)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <MaintenanceMedicationProfile
          maintenanceMedication={maintenanceMedication}
          onMarketedProduct={onMarketedProduct}
          onProduct={onProduct}
          onPackage={onPackage}
          onSpecificProduct={onSpecificProduct}
        />
      </Row>
    </React.Fragment>
  )
}

class MaintenanceMedicationProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new MaintenanceMedicationProfilePageViewModel(
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
    const { maintenanceMedication } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardMaintenanceMedicationHelper.ndc11(maintenanceMedication)}</h1>
          </div>

          <MaintenanceMedicationDisplay
            currentUser={this.props.currentUser}
            maintenanceMedication={maintenanceMedication}
            onMarketedProduct={() => { this.vm.gotoMarketedProduct(maintenanceMedication) }}
            onProduct={() => { this.vm.gotoProduct(maintenanceMedication) }}
            onPackage={() => { this.vm.gotoPackage(maintenanceMedication) }}
            onSpecificProduct={() => { this.vm.gotoSpecificProduct(maintenanceMedication) }}
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

export { MaintenanceMedicationProfilePage }
