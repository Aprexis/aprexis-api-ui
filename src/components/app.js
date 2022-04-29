import React, { Component } from 'react'
import { withLastLocation } from 'react-router-last-location'
import IdleTimer from 'react-idle-timer'
import { Footer, Header, Main } from './'
import { Modals } from './modals'
import { AppViewModel } from './view_models'
import { history, valueHelper } from '../helpers'
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new AppViewModel(
      {
        ...props,
        view: this
      }
    )

    history.listen((_location, _action) => { this.vm.loadData() })
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { context, currentAdminUser, currentUser, modal } = this.state

    return (
      <div>
        <IdleTimer
          debounce={250}
          element={document}
          onIdle={this.vm.idle}
          ref={ref => { this.idleTimer = ref }}
          timeout={30 * 60 * 1000}
        />

        <Header
          actAs={this.vm.actAs}
          actAsUsers={this.state.actAsUsers}
          currentAdminUser={currentAdminUser}
          currentUser={currentUser}
          gotoAccount={this.vm.gotoAccount}
          gotoDiagnosisCodesPage={this.vm.gotoDiagnosisCodesPage}
          gotoDiseasesPage={this.vm.gotoDiseasesPage}
          gotoHealthPlansPage={this.vm.gotoHealthPlansPage}
          gotoLabTestsPage={this.vm.gotoLabTestsPage}
          gotoMedicationsPage={this.vm.gotoMedicationsPage}
          gotoPharmacyChainsPage={this.vm.gotoPharmacyChainsPage}
          gotoPharmacyStoresPage={this.vm.gotoPharmacyStoresPage}
          gotoPhysiciansPage={this.vm.gotoPhysiciansPage}
          gotoUserProfile={this.vm.gotoUserProfile}
          gotoUsersPage={this.vm.gotoUsersPage}
          history={history}
          onSignIn={this.vm.signIn}
          onSignOut={this.vm.signOut}
        />

        <Main
          clearAlert={this.vm.clearAlert}
          context={context}
          currentAdminUser={currentAdminUser}
          currentUser={currentUser}
          errorCount={this.state.errorCount}
          error={this.vm.error}
          launchModal={this.vm.launchModal}
          modalIsOpen={valueHelper.isValue(modal)}
        />

        <Footer currentUser={currentUser} />

        <Modals
          {...valueHelper.importantProps(this.props)}
          {...modal}
          clearAlert={this.vm.clearAlert}
          clearModal={this.vm.clearModal}
          context={this.props.context}
          currentAdminUser={currentAdminUser}
          currentUser={currentUser}
          error={this.vm.error}
          modalClose={this.vm.modalClose}
          modalOpen={this.vm.modalOpen}
        />
      </div>
    )
  }
}

export default withLastLocation(App)
