import React, { Component } from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { pharmacyChainHelper, pharmacyStoreHelper } from '@aprexis/aprexis-api-utility'

class PharmacyStoreHeaders extends Component {
  render() {
    const { currentUser } = this.props
    if (!pharmacyStoreHelper.canIndex(currentUser) || pharmacyChainHelper.canIndex(currentUser)) {
      return (<React.Fragment />)
    }

    return (
      <NavItem>
        <NavLink className="btn-uppercase" onClick={(event) => { this.props.gotoPharmacyStoresPage() }}>
          Pharmacy Stores
        </NavLink>
      </NavItem>
    )
  }
}

export { PharmacyStoreHeaders }
