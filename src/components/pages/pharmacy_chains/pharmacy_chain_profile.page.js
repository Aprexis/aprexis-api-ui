import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Address, Contact, Spinner } from '../../shared'
import { PharmacyChainProfilePageViewModel } from "../../view_models/pages/pharmacy_chains"
import { pharmacyChainHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers"

const PharmacyChainConfiguration = ({ pharmacyChain }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.imageDisplay("Logo", pharmacyChainHelper.logo(pharmacyChain))}
          {displayHelper.display("CCD Code", pharmacyChainHelper.ccdCode(pharmacyChain))}
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
          {displayHelper.display("NPI", pharmacyChainHelper.npi(pharmacyChain))}
          {displayHelper.display("EIN Number", pharmacyChainHelper.einNumber(pharmacyChain))}
          {displayHelper.display("Parent Organization LBN", pharmacyChainHelper.parentOrganizationLbn(pharmacyChain))}
          {displayHelper.display("Notes", pharmacyChainHelper.notes(pharmacyChain))}
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

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PharmacyChainProfilePage }
