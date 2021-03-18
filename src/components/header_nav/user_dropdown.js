import React, { Component } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import { userCredentialsHelper, userHelper, valueHelper } from '../../helpers'

class UserDropdown extends Component {
  constructor(props) {
    super(props)

    this.renderCurrentUser = this.renderCurrentUser.bind(this)
    this.renderNoCurrentUser = this.renderNoCurrentUser.bind(this)
  }

  renderCurrentUser(userCredentials) {
    const { currentUser, } = this.props
    const name = valueHelper.isValue(currentUser) ? userHelper.fullName(currentUser) : userCredentials.username

    return (
      <UncontrolledDropdown className='user-dropdown'>
        <DropdownToggle nav caret>
          {name}
        </DropdownToggle>

        <DropdownMenu right>
          <DropdownItem className='btn-uppercase' onClick={this.props.onUserPage}>
            Account
          </DropdownItem>

          <DropdownItem className='btn-uppercase' onClick={this.props.onSignOut}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  renderNoCurrentUser() {
    const { onSignIn } = this.props

    return (
      <NavItem>
        <NavLink className='btn-uppercase' onClick={onSignIn}>
          Sign-In
        </NavLink>
      </NavItem>
    )
  }

  render() {
    const userCredentials = userCredentialsHelper.get()

    if (valueHelper.isValue(userCredentials)) {
      return this.renderCurrentUser(userCredentials)
    }

    return this.renderNoCurrentUser()
  }
}

export { UserDropdown }
