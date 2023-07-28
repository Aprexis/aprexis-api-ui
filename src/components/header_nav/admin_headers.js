import React, { Component } from 'react'
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap'
import { userHelper } from '@aprexis/aprexis-api-utility'

class AdminHeaders extends Component {
  render() {
    const { currentUser } = this.props
    if (!userHelper.hasRole(currentUser, ['aprexis_admin', 'aprexis_user_admin', 'aprexis_observer'])) {
      return (<React.Fragment />)
    }

    return (
      <UncontrolledDropdown>
        <DropdownToggle caret>
          Admin
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={(_event) => { this.props.gotoBillingClaimHistoryCollectionsPage() }}>
            Billing Claim History Collections
          </DropdownItem>
          <DropdownItem onClick={(_event) => { this.props.gotoConditionMedicationsPage() }}>
            Condition Medications
          </DropdownItem>
          <DropdownItem onClick={(_event) => { this.props.gotoDiseasesPage() }}>
            Diseases
          </DropdownItem>
          <DropdownItem onClick={(_event) => { this.props.gotoDiagnosisCodesPage() }}>
            Diagnosis Codes
          </DropdownItem>
          <DropdownItem onClick={(_event) => { this.props.gotoPhysiciansPage() }}>
            HCPs
          </DropdownItem>
          <DropdownItem onClick={(_event) => { this.props.gotoLabTestsPage() }}>
            Lab Tests
          </DropdownItem>
          <DropdownItem onClick={(_event) => { this.props.gotoMedicationsPage() }}>
            Medications
          </DropdownItem>
          <DropdownItem onClick={(_event) => { this.props.gotoSystemSettingsPage() }}>
            System Settings
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}

export { AdminHeaders }
