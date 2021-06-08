import { AbstractViewModel } from "./"
import { authenticationApi, userApi } from "../../api"
import {
  alertHelper,
  contextHelper,
  history,
  pathHelper,
  userCredentialsHelper,
  userHelper,
  valueHelper
} from "../../helpers"

class AppViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.actAs = this.actAs.bind(this)
    this.clearAlert = this.clearAlert.bind(this)
    this.error = this.error.bind(this)
    this.fetchActAsUsers = this.fetchActAsUsers.bind(this)
    this.getCurrentAdminUser = this.getCurrentAdminUser.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.gotoAccount = this.gotoAccount.bind(this)
    this.gotoDiagnosisCodesPage = this.gotoDiagnosisCodesPage.bind(this)
    this.gotoDiseasesPage = this.gotoDiseasesPage.bind(this)
    this.gotoHealthPlansPage = this.gotoHealthPlansPage.bind(this)
    this.gotoLabTestPage = this.gotoLabTestsPage.bind(this)
    this.gotoPharmacyChainsPage = this.gotoPharmacyChainsPage.bind(this)
    this.gotoPharmacyStoresPage = this.gotoPharmacyStoresPage.bind(this)
    this.gotoUsersPage = this.gotoUsersPage.bind(this)
    this.home = this.home.bind(this)
    this.launchModal = this.launchModal.bind(this)
    this.loadContext = this.loadContext.bind(this)
    this.loadData = this.loadData.bind(this)
    this.modalClose = this.modalClose.bind(this)
    this.modalOpen = this.modalOpen.bind(this)
    this.selectCurrentUser = this.selectCurrentUser.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)

    this.props = {
      ...this.props,
      error: this.error,
      modalClose: this.modalClose,
      modalOpen: this.modalOpen
    }
  }

  actAs(selected) {
    const { value } = selected
    const adminCredentials = userCredentialsHelper.getAdmin()

    if (adminCredentials.id == value) {
      this.selectCurrentUser(adminCredentials)
      return
    }

    userApi.actAs(
      adminCredentials,
      value,
      this.selectCurrentUser,
      this.onError
    )
    return
  }

  clearAlert() {
    alertHelper.clear()
    this.redrawView()
  }

  error(message, nextOperation) {
    alertHelper.error(message)
    let { errorCount } = this.data
    if (valueHelper.isValue(errorCount)) {
      errorCount = errorCount + 1
    } else {
      errorCount = 1
    }
    this.addField("errorCount", errorCount)
    this.redrawView(nextOperation)
  }

  fetchActAsUsers() {
    const adminCredentials = userCredentialsHelper.getAdmin()
    userApi.index(
      adminCredentials,
      {
        for_active: true,
        page: { number: 1, size: 1000000 },
        sort: 'last_name, first_name'
      },
      (actAsUsers) => { this.addField("actAsUsers", actAsUsers, this.redrawView) },
      this.onError
    )
  }

  getCurrentAdminUser(nextOperation) {
    const adminCredentials = userCredentialsHelper.getAdmin()
    if (!valueHelper.isValue(adminCredentials)) {
      nextOperation()
      return
    }

    userApi.account(
      adminCredentials,
      adminCredentials.id,
      (currentAdminUser) => {
        this.addField("currentAdminUser", currentAdminUser, nextOperation)
      },
      this.onError
    )
  }

  getCurrentUser(nextOperation) {
    const userCredentials = userCredentialsHelper.get()
    if (!valueHelper.isValue(userCredentials)) {
      nextOperation()
      return
    }

    userApi.account(
      userCredentials,
      userCredentials.id,
      (currentUser) => {
        this.addField("currentUser", currentUser, nextOperation)
      },
      this.onError
    )
  }

  gotoAccount() {
    const userCredentials = userCredentialsHelper.get()
    pathHelper.gotoPage(["users", userCredentials.id, "profile"])
  }

  gotoDiagnosisCodesPage() {
    pathHelper.gotoPage(["admin", "diagnosis-codes"])
  }

  gotoDiseasesPage() {
    pathHelper.gotoPage(["admin", "diseases"])
  }

  gotoHealthPlansPage() {
    pathHelper.gotoPage(["health-plans"])
  }

  gotoLabTestsPage() {
    pathHelper.gotoPage(["lab-tests"])
  }

  gotoPharmacyChainsPage() {
    pathHelper.gotoPage(["pharmacy-chains"])
  }

  gotoPharmacyStoresPage() {
    pathHelper.gotoPage(["pharmacy-stores"])
  }

  gotoUsersPage() {
    pathHelper.gotoPage(["users"])
  }

  home() {
    const userCredentials = userCredentialsHelper.get()
    if (valueHelper.isValue(userCredentials)) {
      history.push("/dashboard")
      return
    }

    history.push("/")
  }

  launchModal(modalName, propsForModal = {}) {
    this.addField("modal", { modalName, ...propsForModal })
    this.clearAlert()
  }

  loadContext(nextOperation) {
    contextHelper.updateContext(nextOperation)
  }

  loadData() {
    this.clearData(false, ["actAsUsers"])
    this.getCurrentUser(
      () => {
        this.getCurrentAdminUser(
          () => {
            this.loadContext(
              (context) => {
                this.addField("context", context)
                if (userHelper.hasRole(this.data.currentAdminUser, 'aprexis_admin')) {
                  this.fetchActAsUsers()
                } else {
                  this.redrawView()
                }
              }
            )
          }
        )
      }
    )
  }

  modalClose(nextOperation) {
    this.addField("modalIsOpen", false, () => { this.redrawView(nextOperation) })
  }

  modalOpen(nextOperation) {
    this.addField("modalIsOpen", true, () => { this.redrawView(nextOperation) })
  }

  selectCurrentUser(userCredentials) {
    const adminCredentials = userCredentialsHelper.getAdmin()

    userCredentialsHelper.setAdmin(adminCredentials)
    userCredentialsHelper.set(userCredentials)

    this.getCurrentAdminUser(() => { this.getCurrentUser(this.home) })
  }

  signIn() {
    this.launchModal("sign-in", { modalProps: { updateView: this.home } })
    alertHelper.clear()
  }

  signOut() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.remove()
    authenticationApi.signOut(userCredentials, this.home)
  }
}

export { AppViewModel }
