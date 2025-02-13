import React, { Component, useEffect } from 'react'
import { withLastLocation } from 'react-router-last-location'
import IdleTimer from 'react-idle-timer'
import { Footer, Header, Main } from './'
import { Modals } from './modals'
import { AppViewModel } from './view_models'
import { history } from '../helpers'
import { valueHelper } from '@aprexis/aprexis-api-utility'
import 'bootstrap/dist/css/bootstrap.css'

const Timer = ({ vm }) => {
  useEffect(
    () => {
      const interval = setInterval(vm.timer, 1000)

      return () => clearInterval(interval)
    },
    [vm]
  )

  return (
    <div className="timer">
    </div>
  )
}

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
    const myVM = this.vm
    window.onbeforeunload = function () {
      if (valueHelper.isValue(myVM)) {
        myVM.loadData()
      }
      return
    }

    this.vm.mounted()
  }

  componentWillUnmount() {
    window.onbeforeunload = null
  }

  render() {
    const { context, currentAdminUser, currentUser, modal } = this.state

    return (
      <div>
        <Timer vm={this.vm} />
        <IdleTimer
          crossTab={{ emitOnAllTabs: true }}
          debounce={250}
          element={document}
          onActive={this.vm.active}
          onIdle={this.vm.idle}
          ref={ref => { this.idleTimer = ref }}
          timeout={1000}
        />

        <Header
          actAs={this.vm.actAs}
          currentAdminUser={currentAdminUser}
          currentUser={currentUser}
          gotoAccount={this.vm.gotoAccount}
          gotoBillingClaimHistoryCollectionsPage={this.vm.gotoBillingClaimHistoryCollectionsPage}
          gotoBillingInvoicesPage={this.vm.gotoBillingInvoicesPage}
          gotoConditionMedicationsPage={this.vm.gotoConditionMedicationsPage}
          gotoDiagnosisCodesPage={this.vm.gotoDiagnosisCodesPage}
          gotoDiseasesPage={this.vm.gotoDiseasesPage}
          gotoGoldStandardPage={this.vm.gotoGoldStandardPage}
          gotoHealthPlansPage={this.vm.gotoHealthPlansPage}
          gotoLabTestsPage={this.vm.gotoLabTestsPage}
          gotoLoadProvidersPage={this.vm.gotoLoadProvidersPage}
          gotoMedicationsPage={this.vm.gotoMedicationsPage}
          gotoNadacPricesPage={this.vm.gotoNadacPricesPage}
          gotoPharmacyChainsPage={this.vm.gotoPharmacyChainsPage}
          gotoPharmacyStoresPage={this.vm.gotoPharmacyStoresPage}
          gotoPhysiciansPage={this.vm.gotoPhysiciansPage}
          gotoPotentiallyInappropriateMedicationsPage={this.vm.gotoPotentiallyInappropriateMedicationsPage}
          gotoSystemSettingsPage={this.vm.gotoSystemSettingsPage}
          gotoUsersPage={this.vm.gotoUsersPage}
          history={history}
          onSignIn={this.vm.signIn}
          onSignOut={this.vm.signOut}
          reconnectAndRetry={this.vm.reconnectAndRetyr}
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
          reconnectAndRetry={this.vm.reconnectAndRetry}
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
          reconnectAndRetry={this.vm.reconnectAndRetry}
        />
      </div>
    )
  }
}

export default withLastLocation(App)
