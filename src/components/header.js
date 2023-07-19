import React, { Component } from "react"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Collapse, Nav, Navbar, NavbarBrand } from "reactstrap"
import { pathHelper } from "../helpers"
import {
  AdminHeaders,
  AprexisAdminHeaders,
  HealthPlanHeaders,
  PharmacyChainHeaders,
  PharmacyStoreHeaders,
  UserDropdown,
  UserHeaders
} from "./header_nav"

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = { collapsed: true }

    this.toggleNavBar = this.toggleNavBar.bind(this)
  }

  render() {
    const { currentAdminUser, currentUser, history, reconnectAndRetry } = this.props

    return (
      <header
        className="fixed-top"
        id="header">
        <Navbar className="top-w-100" color="inverse" expand="md" fixed="true">
          <NavbarBrand className="mr-auto px-2 px-md-0">
            <img
              style={{ height: "43px", width: "123px" }}
              src={`${process.env.PUBLIC_URL}${pathHelper.root()}/aprexis-logo.png`}
              alt="Aprexis logo"
            />
          </NavbarBrand>

          <div className="container-fluid pr-3">
            <div className="col-12 px-0 text-right">
              <button
                className="navbar-toggler mr-auto btn btn-mobile"
                onClick={this.toggleNavBar}
                type="button">
                <FontAwesomeIcon icon={faBars} />
              </button>

              <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav className="header-nav ml-md-auto" navbar>
                  <HealthPlanHeaders currentUser={currentUser} gotoHealthPlansPage={this.props.gotoHealthPlansPage} reconnectAndRetry={reconnectAndRetry} />
                  <PharmacyChainHeaders
                    currentUser={currentUser}
                    gotoPharmacyChainsPage={this.props.gotoPharmacyChainsPage}
                    reconnectAndRetry={reconnectAndRetry}
                  />
                  <PharmacyStoreHeaders
                    currentUser={currentUser}
                    gotoPharmacyStoresPage={this.props.gotoPharmacyStoresPage}
                    reconnectAndRetry={reconnectAndRetry}
                  />
                  <UserHeaders currentUser={currentUser} gotoUsersPage={this.props.gotoUsersPage} reconnectAndRetry={reconnectAndRetry} />
                  <AdminHeaders
                    currentUser={currentUser}
                    gotoBillingClaimHistoryCollectionsPage={this.props.gotoBillingClaimHistoryCollectionsPage}
                    gotoDiagnosisCodesPage={this.props.gotoDiagnosisCodesPage}
                    gotoDiseasesPage={this.props.gotoDiseasesPage}
                    gotoLabTestsPage={this.props.gotoLabTestsPage}
                    gotoMedicationsPage={this.props.gotoMedicationsPage}
                    gotoPhysiciansPage={this.props.gotoPhysiciansPage}
                    gotoSystemSettingsPage={this.props.gotoSystemSettingsPage}
                    reconnectAndRetry={reconnectAndRetry}
                  />

                  <UserDropdown
                    currentAdminUser={currentAdminUser}
                    currentUser={currentUser}
                    gotoAccount={this.props.gotoAccount}
                    history={history}
                    onSignIn={this.props.onSignIn}
                    onSignOut={(_event) => { this.props.onSignOut("Logged out") }}
                    reconnectAndRetry={reconnectAndRetry}
                  />
                </Nav>
              </Collapse>
            </div>
          </div>
        </Navbar>

        <AprexisAdminHeaders
          actAs={this.props.actAs}
          currentAdminUser={currentAdminUser}
          currentUser={currentUser}
          reconnectAndRetry={reconnectAndRetry}
        />
      </header>
    )
  }

  toggleNavBar() {
    this.setState((oldState) => { return { collapsed: !oldState.collapsed } })
  }
}

export { Header }
