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
        ...this.props,
        view: this
      }
    )

    history.listen(
      (location, action) => {
        this.vm.loadData(location)
      }
    )
  }

  componentDidMount() {
    this.vm.loadData(window.location)
  }

  render() {
    const { match } = this.props
    const { currentUser, modal } = this.state

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
          currentUser={currentUser}
          history={history}
          match={match}
          signIn={this.vm.signIn}
          signOut={this.vm.signOut}
        />

        <Main history={history} match={match} />

        <Footer history={history} match={match} />

        <Modals {...modal} clearModal={this.vm.clearModal} modalProps={{ 'sign-in': { updateView: this.vm.home } }} />
      </div>
    )
  }

  shouldComponentUpdate() {
    return !this.vm.forceLogoutOnSignInPage(window.location)
  }
}

export default withLastLocation(App)
