import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../../../shared/index.js'
import { PackageVersionProfilePageViewModel } from '../../../../view_models/pages/admin/gold_standard/package_versions/index.js'
import { goldStandardPackageVersionHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../../../helpers/index.js'

const PackageVersionProfile = ({ packageVersion, onProduct, onPackage }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Descriptor", goldStandardPackageVersionHelper.packageDescriptorText(packageVersion))}
          {
            displayHelper.display(
              "Product",
              goldStandardPackageVersionHelper.goldStandardProductNameLong(packageVersion),
              '',
              ':',
              false,
              onProduct
            )
          }
          {
            displayHelper.display(
              "Package",
              goldStandardPackageVersionHelper.goldStandardPackageDescription(packageVersion),
              '',
              ':',
              false,
              onPackage
            )
          }
          {displayHelper.display("NDC-10", goldStandardPackageVersionHelper.ndc10(packageVersion))}
          {displayHelper.display("NDC-11", goldStandardPackageVersionHelper.ndc11(packageVersion))}
          {displayHelper.display("Package Identifier", goldStandardPackageVersionHelper.packageIdentifier(packageVersion))}
          {displayHelper.display("Package Identifier Type", goldStandardPackageVersionHelper.packageIdentifierType(packageVersion))}
          {displayHelper.display("Formatted Package Identifier", goldStandardPackageVersionHelper.formattedPackageIdentifier(packageVersion))}
          {displayHelper.display("Unformatted NDC10", goldStandardPackageVersionHelper.unformattedNdc10(packageVersion))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PackageVersionMarketing = ({ packageVersion, onReplacedByPackage }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Marketing</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.dateDisplay("On Market", goldStandardPackageVersionHelper.packageVersionOnMarketDate(packageVersion))}
          {displayHelper.booleanDisplay("Preservative Free", goldStandardPackageVersionHelper.preservativeFree(packageVersion))}
          {displayHelper.dateDisplay("Replaced", goldStandardPackageVersionHelper.replacedDate(packageVersion))}
          {displayHelper.display(
            "Replaced By",
            goldStandardPackageVersionHelper.goldStandardReplacedByPackageDescription(packageVersion),
            '',
            ':',
            false,
            onReplacedByPackage
          )}
          {displayHelper.dateDisplay("Off Market", goldStandardPackageVersionHelper.packageVersionOffMarketDate(packageVersion))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PackageVersionDispensing = ({ packageVersion }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex fill">
        <CardTitle>
          <h3>Dispensing</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Size", goldStandardPackageVersionHelper.packageSize(packageVersion))}
          {displayHelper.display("Outer Package Unit ID", goldStandardPackageVersionHelper.goldStandardOuterPackageUnitId(packageVersion))}
          {displayHelper.display("Inner Package Unit ID", goldStandardPackageVersionHelper.goldStandardInnerPackageUnitId(packageVersion))}
          {displayHelper.display("Inner Package Count", goldStandardPackageVersionHelper.innerPackageCount(packageVersion))}
          {displayHelper.display("NCPDP Billing Unit ID", goldStandardPackageVersionHelper.goldStandardNcpdpBillingUnitId(packageVersion))}
          {displayHelper.display("NCPDP Exceptional Count", goldStandardPackageVersionHelper.ncpdpExceptionalCount(packageVersion))}
          {displayHelper.display("NCPDP Script Form Code", goldStandardPackageVersionHelper.ncpdpScriptFormCode(packageVersion))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PackageVersionDisplay = ({ packageVersion, onProduct, onPackage, onReplacedByPackage }) => {
  if (!valueHelper.isValue(packageVersion)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PackageVersionProfile packageVersion={packageVersion} onProduct={onProduct} onPackage={onPackage} />
        <PackageVersionMarketing packageVersion={packageVersion} onReplacedByPackage={onReplacedByPackage} />
      </Row>

      <Row>
        <PackageVersionDispensing packageVersion={packageVersion} />
      </Row>
    </React.Fragment>
  )
}

class PackageVersionProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PackageVersionProfilePageViewModel(
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
    const { packageVersion } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{goldStandardPackageVersionHelper.packageVersionDescription(packageVersion)}</h1>
            <h2>Version: {goldStandardPackageVersionHelper.version(packageVersion)}</h2>
          </div>

          <PackageVersionDisplay
            currentUser={this.props.currentUser}
            packageVersion={packageVersion}
            onProduct={() => { this.vm.gotoProduct(packageVersion) }}
            onPackage={() => { this.vm.gotoPackage(packageVersion) }}
            onReplacedByPackage={() => { this.vm.gotoReplacedByPackage(packageVersion) }}
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

export { PackageVersionProfilePage }
