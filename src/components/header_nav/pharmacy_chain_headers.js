import React, { Component } from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { pharmacyChainHelper } from '@aprexis/aprexis-api-utility'

class PharmacyChainHeaders extends Component {
  render() {
    const { currentUser } = this.props
    if (!pharmacyChainHelper.canIndex(currentUser)) {
      return (<React.Fragment />)
    }

    return (
      <NavItem>
        <NavLink className="btn-uppercase" onClick={(event) => { this.props.gotoPharmacyChainsPage() }}>
          Pharmacy Chains
        </NavLink>
      </NavItem>
    )
  }
}

export { PharmacyChainHeaders }
