import { AbstractViewModel } from './'
import { authenticationApi, userApi } from '../../api'
import { alertHelper, history, userCredentialsHelper, valueHelper } from '../../helpers'

class AppViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.home = this.home.bind(this)
    this.loadData = this.loadData.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.userPage = this.userPage.bind(this)
    this.usersPage = this.usersPage.bind(this)
  }

  getCurrentUser(nextOperation) {
    const userCredentials = userCredentialsHelper.get()
    if (valueHelper.isValue(userCredentials)) {
      userApi.show(
        userCredentials,
        userCredentials.id,
        (currentUser) => {
          this.addField('currentUser', currentUser, nextOperation)
        },
        this.onError
      )
    }
  }

  home() {
    const userCredentials = userCredentialsHelper.get()
    if (valueHelper.isValue(userCredentials)) {
      history.push('/dashboard')
      return
    }

    history.push('/')
  }

  loadData() {
    this.clearData(false)
    this.getCurrentUser()
  }

  signIn() {
    alertHelper.clear()
    this.addField('modal', { modalName: 'sign-in' })
  }

  signOut() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.remove()
    authenticationApi.signOut(userCredentials, this.home)
  }

  userPage() {
    const userCredentials = userCredentialsHelper.get()

    history.push(`/users/${userCredentials.id}`)
  }

  usersPage() {
    history.push('/users')
  }
}

export { AppViewModel }
