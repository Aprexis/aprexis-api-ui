import React, { Component } from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { userHelper } from '@aprexis/aprexis-api-utility'

class UserHeaders extends Component {
  render() {
    const { currentUser } = this.props
    if (!userHelper.canModifyUsers(currentUser)) {
      return (<React.Fragment />)
    }

    return (
      <NavItem>
        <NavLink className="btn-uppercase" onClick={(event) => { this.props.gotoUsersPage() }}>
          Users
        </NavLink>
      </NavItem>
    )
  }
}

export { UserHeaders }
