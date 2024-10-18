import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared'
import { PackageProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/packages'
import { goldStandardPackageHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers'

const PackageProfile = ({ gsPackage, onProduct }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Descriptor", goldStandardPackageHelper.packageDescriptorText(gsPackage))}
          {
            displayHelper.display(
              "Product",
              goldStandardPackageHelper.goldStandardProductNameLong(gsPackage),
              '',
              ':',
              false,
              onProduct
            )
          }
          {displayHelper.display("NDC-10", goldStandardPackageHelper.ndc10(gsPackage))}
          {displayHelper.display("NDC-11", goldStandardPackageHelper.ndc11(gsPackage))}
          {displayHelper.display("UPC", goldStandardPackageHelper.upc(gsPackage))}
          {displayHelper.display("NHRIC", goldStandardPackageHelper.nhric(gsPackage))}
          {displayHelper.display("Gtin12", goldStandardPackageHelper.gtin12(gsPackage))}
          {displayHelper.display("Gtin14", goldStandardPackageHelper.gtin14(gsPackage))}
          {displayHelper.display("Pin", goldStandardPackageHelper.pin(gsPackage))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PackageMarketing = ({ gsPackage }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Marketing</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.dateDisplay("On Market", goldStandardPackageHelper.packageOnMarketDate(gsPackage))}
          {displayHelper.booleanDisplay("Preservative Free", goldStandardPackageHelper.preservativeFree(gsPackage))}
          {displayHelper.dateDisplay("Lot Expiry", goldStandardPackageHelper.lotExpiry(gsPackage))}
          {displayHelper.dateDisplay("Replaced", goldStandardPackageHelper.replacedDate(gsPackage))}
          {displayHelper.display("Replaced By", goldStandardPackageHelper.goldStandardReplacedByPackageDescription(gsPackage))}
          {displayHelper.dateDisplay("Off Market", goldStandardPackageHelper.offMarket(gsPackage))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PackageDispensing = ({ gsPackage }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Dispensing</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Size", goldStandardPackageHelper.packageSize(gsPackage))}
          {displayHelper.display("Outer Package Unit ID", goldStandardPackageHelper.goldStandardOuterPackageUnitId(gsPackage))}
          {displayHelper.display("Inner Package Unit ID", goldStandardPackageHelper.goldStandardInnerPackageUnitId(gsPackage))}
          {displayHelper.display("Inner Package Count", goldStandardPackageHelper.innerPackageCount(gsPackage))}
          {displayHelper.booleanDisplay("Not Splittable", goldStandardPackageHelper.notSplittable(gsPackage))}
          {displayHelper.booleanDisplay("Short Cycle Dispensing", goldStandardPackageHelper.shortCycleDispensing(gsPackage))}
          {displayHelper.booleanDisplay("Short Cycle Dispensing Is Manual", goldStandardPackageHelper.shortCycleDispensingIsManual(gsPackage))}
          {displayHelper.display("Minimum Dispense Quantity", goldStandardPackageHelper.minimumDispenseQuantity(gsPackage))}
          {displayHelper.booleanDisplay("Minimum Dispense Quantity Is Manual", goldStandardPackageHelper.minimumDispenseQuantityIsManual(gsPackage))}
          {displayHelper.display("Unit Dose Type ID", goldStandardPackageHelper.goldStandardUnitDoseTypeId(gsPackage))}
          {displayHelper.display("NCPDP Billing Unit ID", goldStandardPackageHelper.goldStandardNcpdpBillingUnitId(gsPackage))}
          {displayHelper.display("NCPDP Exceptional Count", goldStandardPackageHelper.ncpdpExceptionalCount(gsPackage))}
          {displayHelper.display("NCPDP Script Form Code", goldStandardPackageHelper.ncpdpScriptFormCode(gsPackage))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PackageDisplay = ({ gsPackage, onProduct }) => {
  if (!valueHelper.isValue(gsPackage)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PackageProfile gsPackage={gsPackage} onProduct={onProduct} />
        <PackageMarketing gsPackage={gsPackage} />
      </Row>

      <Row>
        <PackageDispensing gsPackage={gsPackage} />
      </Row>
    </React.Fragment>
  )
}

class PackageProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PackageProfilePageViewModel(
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
    const { gsPackage } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardPackageHelper.packageDescription(gsPackage)}</h1>
          </div>

          <PackageDisplay
            currentUser={this.props.currentUser}
            gsPackage={gsPackage}
            onProduct={() => { this.vm.gotoProduct(gsPackage) }}
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

export { PackageProfilePage }
