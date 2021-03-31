import { AbstractViewModel } from './'
import { authenticationApi, userApi } from '../../api'
import { alertHelper, contextHelper, history, pathHelper, userCredentialsHelper, valueHelper } from '../../helpers'

class AppViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.gotoAccount = this.gotoAccount.bind(this)
    this.gotoHealthPlansPage = this.gotoHealthPlansPage.bind(this)
    this.gotoUsersPage = this.gotoUsersPage.bind(this)
    this.home = this.home.bind(this)
    this.loadContext = this.loadContext.bind(this)
    this.loadData = this.loadData.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  getCurrentUser(nextOperation) {
    const userCredentials = userCredentialsHelper.get()
    if (!valueHelper.isValue(userCredentials)) {
      nextOperation()
      return
    }

    userApi.show(
      userCredentials,
      userCredentials.id,
      (currentUser) => {
        this.addField('currentUser', currentUser, nextOperation)
      },
      this.onError
    )
  }

  gotoAccount() {
    const userCredentials = userCredentialsHelper.get()
    pathHelper.gotoPage(['users', userCredentials.id, 'profile'])
  }

  gotoHealthPlansPage() {
    pathHelper.gotoPage(['health-plans'])
  }

  gotoUsersPage() {
    pathHelper.gotoPage(['users'])
  }

  home() {
    const userCredentials = userCredentialsHelper.get()
    if (valueHelper.isValue(userCredentials)) {
      history.push('/dashboard')
      return
    }

    history.push('/')
  }

  loadContext(nextOperation) {
    contextHelper.updateContext(nextOperation)
  }

  loadData() {
    this.clearData(false)
    this.getCurrentUser(
      () => {
        this.loadContext(
          (context) => {
            this.addField('context', context)
            this.redrawView()
          }
        )
      }
    )
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
}

export { AppViewModel }
