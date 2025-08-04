import { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { EditButton, Spinner } from "../../../shared/index.js"
import {
  BillingContractPharmacyChainProfilePageViewModel
} from "../../../view_models/pages/billing/pharmacy_chains/index.js"
import { valueHelper, billingContractPharmacyChainHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from '../../../../helpers/index.js'

const BillingContractPharmacyChainProfile = ({ currentUser, onEditProfile, billingContractPharmacy }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              billingContractPharmacyChainHelper.canEdit(currentUser, billingContractPharmacy) &&
              <EditButton onEdit={(_event) => { onEditProfile(billingContractPharmacy) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {
            displayHelper.display(
              "Health Plan",
              billingContractPharmacyChainHelper.healthPlanName(billingContractPharmacy)
            )
          }
          {
            displayHelper.booleanDisplay(
              "Clinical Programs",
              billingContractPharmacyChainHelper.clinical(billingContractPharmacy)
            )
          }
          {
            displayHelper.booleanDisplay(
              "Transactional Programs",
              billingContractPharmacyChainHelper.transactional(billingContractPharmacy)
            )
          }
          {
            displayHelper.booleanDisplay(
              "Pulls Enabled",
              billingContractPharmacyChainHelper.pullsEnabled(billingContractPharmacy)
            )
          }
          {
            displayHelper.booleanDisplay(
              "Claims Enabled",
              billingContractPharmacyChainHelper.claimsEnabled(billingContractPharmacy)
            )
          }
        </CardBody>
      </Card>
    </Col>
  )
}

const BillingContractPharmacyChainDisplay = ({ currentUser, onEditProfile, billingContractPharmacy }) => {
  if (!valueHelper.isValue(billingContractPharmacy)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <BillingContractPharmacyChainProfile
        currentUser={currentUser}
        onEditProfile={onEditProfile}
        billingContractPharmacy={billingContractPharmacy}
      />
    </Row>
  )
}

class BillingContractPharmacyChainProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractPharmacyChainProfilePageViewModel(
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
    const { billingContractPharmacy } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{billingContractPharmacyChainHelper.pharmacyChainName(billingContractPharmacy)}</h1>
          </div>

          <BillingContractPharmacyChainDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editModal}
            billingContractPharmacy={billingContractPharmacy}
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

export { BillingContractPharmacyChainProfilePage }
