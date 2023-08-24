import React, { Component } from 'react'
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap'
import { userHelper } from '@aprexis/aprexis-api-utility'

class BillingHeaders extends Component {
  render() {
    const { currentUser } = this.props
    if (!userHelper.hasRole(currentUser, ['aprexis_admin', 'aprexis_user_admin', 'aprexis_observer'])) {
      return (<React.Fragment />)
    }

    return (
      <UncontrolledDropdown>
        <DropdownToggle caret>
          Billing
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={(_event) => { this.props.gotoBillingClaimHistoryCollectionsPage() }}>
            Claim History Collections
          </DropdownItem>
          <DropdownItem onClick={(_event) => { this.props.gotoBillingInvoicesPage() }}>
            Invoices
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}

export { BillingHeaders }
