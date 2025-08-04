import React, { Component } from "react"
import { DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown } from "reactstrap"
import { userHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { userCredentialsHelper } from "../../helpers/index.js"

class UserDropdown extends Component {
  constructor(props) {
    super(props)

    this.renderCurrentUser = this.renderCurrentUser.bind(this)
    this.renderNoCurrentUser = this.renderNoCurrentUser.bind(this)
  }

  renderCurrentUser(userCredentials) {
    const { currentAdminUser, currentUser } = this.props

    return (
      <UncontrolledDropdown className="user-dropdown">
        <DropdownToggle nav caret className="pt-1 mt-0">
          {nameLabel(userCredentials, currentAdminUser, currentUser)}
        </DropdownToggle>

        <DropdownMenu right>
          <DropdownItem className="btn-uppercase" onClick={this.props.gotoAccount}>
            Account
          </DropdownItem>

          <DropdownItem className="btn-uppercase" onClick={this.props.onSignOut}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )

    function nameLabel(userCredentials, currentAdminUser, currentUser) {
      if (!valueHelper.isValue(currentAdminUser)) {
        return (<label className="btn-uppercase">{userCredentials.username}</label>)
      }

      if (!valueHelper.isValue(currentUser) || userHelper.id(currentUser) == userHelper.id(currentAdminUser)) {
        return (<label className="btn-uppercase">{userHelper.fullName(currentAdminUser)}</label>)
      }

      return (
        <React.Fragment>
          <label className="btn-uppercase">{userHelper.fullName(currentAdminUser)}</label>
          <br />
          <label className="btn-uppercase">AS: {userHelper.fullName(currentUser)}</label>
        </React.Fragment>
      )
    }
  }

  renderNoCurrentUser() {
    const { onSignIn } = this.props

    return (
      <NavItem>
        <NavLink className="btn-uppercase" onClick={onSignIn}>
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
