import React, { Component } from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { userHelper } from '../../helpers'

class UserHeaders extends Component {
  render() {
    const { currentUser } = this.props

    return (
      <React.Fragment>
        {
          userHelper.canModifyUsers(currentUser) &&
          <NavItem>
            <NavLink className="btn-uppercase" onClick={(event) => { this.props.onUsersPage() }}>
              Users
            </NavLink>
          </NavItem>
        }
      </React.Fragment>
    )
  }
}

export { UserHeaders }
