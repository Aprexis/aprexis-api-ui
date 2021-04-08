import React, { Component } from 'react'
import { withLastLocation } from 'react-router-last-location'
import IdleTimer from 'react-idle-timer'
import { Footer, Header, Main } from './'
import { Modals } from './modals'
import { AppViewModel } from './view_models'
import { history } from '../helpers'
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
    const { context, currentUser, modal } = this.state

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
          currentAdminUser={this.state.currentAdminUser}
          currentUser={currentUser}
          gotoAccount={this.vm.gotoAccount}
          gotoHealthPlansPage={this.vm.gotoHealthPlansPage}
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
          currentUser={currentUser}
          history={history} match={match}
        />

        <Footer currentUser={currentUser} history={history} match={match} />

        <Modals
          {...modal}
          clearAlert={this.vm.clearAlert}
          clearModal={this.vm.clearModal}
          modalProps={{ 'sign-in': { updateView: this.vm.home } }}
        />
      </div>
    )
  }
}

export default withLastLocation(App)
