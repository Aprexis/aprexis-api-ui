import React, { Component } from 'react'
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap'
import { userHelper } from '../../helpers'

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
          <DropdownItem onClick={(event) => { this.props.gotoDiseasesPage() }}>
            Diseases
          </DropdownItem>
          <DropdownItem onClick={(event) => { this.props.gotoDiagnosisCodesPage() }}>
            Diagnosis Codes
          </DropdownItem>
          <DropdownItem onClick={(event) => { this.props.gotoPhysiciansPage() }}>
            HCPs
          </DropdownItem>
          <DropdownItem onClick={(event) => { this.props.gotoLabTestsPage() }}>
            Lab Tests
          </DropdownItem>
          <DropdownItem onClick={(event) => { this.props.gotoMedicationsPage() }}>
            Medications
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}

export { AdminHeaders }
