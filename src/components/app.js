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

    history.listen((location, action) => { this.vm.loadData() })
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { match } = this.props
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
          gotoPharmacyChainsPage={this.vm.gotoPharmacyChainsPage}
          gotoPharmacyStoresPage={this.vm.gotoPharmacyStoresPage}
          gotoUsersPage={this.vm.gotoUsersPage}
          history={history}
          match={match}
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
          modalClose={this.vm.modalClose}
          modalIsOpen={this.state.modalIsOpen}
          modalOpen={this.vm.modalOpen}
          history={history} match={match}
        />

        <Footer currentUser={currentUser} history={history} match={match} />

        <Modals
          {...valueHelper.importantProps(this.props)}
          {...modal}
          clearAlert={this.vm.clearAlert}
          clearModal={this.vm.clearModal}
          context={this.props.context}
          currentAdminUser={this.props.currentAdminUser}
          currentUser={this.props.currentUser}
          modalProps={{ 'sign-in': { updateView: this.vm.home } }}
        />
      </div>
    )
  }
}

export default withLastLocation(App)
