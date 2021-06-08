import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Address, Contact, Spinner } from '../../shared'
import { PharmacyChainProfilePageViewModel } from "../../view_models/pages/pharmacy_chains"
import { fieldHelper, pharmacyChainHelper, valueHelper } from "../../../helpers"

const PharmacyChainConfiguration = ({ pharmacyChain }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.imageDisplay("Logo", pharmacyChain.logo)}
          {fieldHelper.display("CCD Code", pharmacyChain.ccd_code)}
        </CardBody>
      </Card>
    </Col>

  )
}

const PharmacyChainProfile = ({ pharmacyChain }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          <Address addressable={pharmacyChain} />
          <Contact contactable={pharmacyChain} />
          {fieldHelper.display("NPI", pharmacyChain.npi)}
          {fieldHelper.display("EIN Number", pharmacyChain.ein_number)}
          {fieldHelper.display("Parent Organization LBN", pharmacyChain.parent_organization_lbn)}
          {fieldHelper.display("Notes", pharmacyChain.notes)}
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyChainStatement = ({ pharmacyChain }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Statement</h3>
        </CardTitle>

        <CardBody>
          <Address addressable={pharmacyChain} prefix='statement' />
          <Contact contactable={pharmacyChain} prefix='statement' />
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyChainDisplay = ({ pharmacyChain }) => {
  if (!valueHelper.isValue(pharmacyChain)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PharmacyChainProfile pharmacyChain={pharmacyChain} />
        <PharmacyChainStatement pharmacyChain={pharmacyChain} />
      </Row>

      <Row>
        <PharmacyChainConfiguration pharmacyChain={pharmacyChain} />
      </Row>
    </React.Fragment>
  )
}

class PharmacyChainProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PharmacyChainProfilePageViewModel(
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
    const { pharmacyChain } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{pharmacyChainHelper.name(pharmacyChain)}</h1>
          </div>

          <PharmacyChainDisplay currentUser={this.props.currentUser} pharmacyChain={pharmacyChain} />
        </Col>
      </Container>
    )
  }
}

export { PharmacyChainProfilePage }
