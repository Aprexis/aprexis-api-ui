import React, { Component } from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { healthPlanHelper } from '../../helpers'

class HealthPlanHeaders extends Component {
  render() {
    const { currentUser } = this.props
    if (!healthPlanHelper.canIndex(currentUser)) {
      return (<React.Fragment />)
    }

    return (
      <NavItem>
        <NavLink className="btn-uppercase" onClick={(event) => { this.props.gotoHealthPlansPage() }}>
          Health Plans
        </NavLink>
      </NavItem>
    )
  }
}

export { HealthPlanHeaders }
