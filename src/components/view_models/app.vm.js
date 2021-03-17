import { AbstractViewModel } from './'
import { authenticationApi } from '../../api'
import { alertHelper, history, userCredentialsHelper, valueHelper } from '../../helpers'

class AppViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.forceLogoutOnSignInPage = this.forceLogoutOnSignInPage.bind(this)
    this.home = this.home.bind(this)
    this.loadData = this.loadData.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  forceLogoutOnSignInPage(location) {
    if (!location.pathname.endsWith('/sign-in')) {
      return false
    }

    const userCredentials = userCredentialsHelper.get()
    if (!valueHelper.isValue(userCredentials)) {
      return false
    }

    this.signOut('Logged out on sign-in page')
    return true
  }

  home() {
    const userCredentials = userCredentialsHelper.get()
    if (!valueHelper.isValue(userCredentials)) {
      history.push('/dashboard')
      return
    }

    history.push('/')
  }

  loadData() {
    this.clearData(false)
    // TODO: add retrieval of current user information.
    this.redrawView()
  }

  signIn() {
    alertHelper.clear()
    this.addField('modal', { modalName: 'sign-in' })
  }

  signOut(message) {
    this.clearData()

    const userCredentials = userCredentialsHelper.remove()
    authenticationApi.signOut(userCredentials, this.home)
  }
}

export { AppViewModel }
