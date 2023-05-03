import { AbstractViewModel } from "./"
import { authenticationApi, userApi, valueHelper } from '@aprexis/aprexis-api-utility'
import {
  alertHelper,
  apiEnvironmentHelper,
  contextHelper,
  pathHelper,
  userCredentialsHelper
} from "../../helpers"

class AppViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.actAs = this.actAs.bind(this)
    this.clearAlert = this.clearAlert.bind(this)
    this.error = this.error.bind(this)
    this.getCurrentAdminUser = this.getCurrentAdminUser.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.gotoAccount = this.gotoAccount.bind(this)
    this.gotoBillingClaimHistoryCollectionsPage = this.gotoBillingClaimHistoryCollectionsPage.bind(this)
    this.gotoDiagnosisCodesPage = this.gotoDiagnosisCodesPage.bind(this)
    this.gotoDiseasesPage = this.gotoDiseasesPage.bind(this)
    this.gotoHealthPlansPage = this.gotoHealthPlansPage.bind(this)
    this.gotoLabTestPage = this.gotoLabTestsPage.bind(this)
    this.gotoMedicationsPage = this.gotoMedicationsPage.bind(this)
    this.gotoPharmacyChainsPage = this.gotoPharmacyChainsPage.bind(this)
    this.gotoPharmacyStoresPage = this.gotoPharmacyStoresPage.bind(this)
    this.gotoPhysiciansPage = this.gotoPhysiciansPage.bind(this)
    this.gotoSystemSettingsPage = this.gotoSystemSettingsPage.bind(this)
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
      apiEnvironmentHelper.apiEnvironment(adminCredentials),
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

  getCurrentAdminUser(nextOperation) {
    const adminCredentials = userCredentialsHelper.getAdmin()
    if (!valueHelper.isValue(adminCredentials)) {
      nextOperation()
      return
    }

    userApi.account(
      apiEnvironmentHelper.apiEnvironment(adminCredentials),
      adminCredentials.user_id,
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
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      userCredentials.user_id,
      (currentUser) => {
        this.addField("currentUser", currentUser, nextOperation)
      },
      this.onError
    )
  }

  gotoAccount() {
    const userCredentials = userCredentialsHelper.get()
    pathHelper.gotoPage(["users", userCredentials.user_id, "profile"])
  }

  gotoBillingClaimHistoryCollectionsPage() {
    pathHelper.gotoPage(["admin", "billing-claim-history-collections"])
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
    pathHelper.gotoPage(["admin", "lab-tests"])
  }

  gotoMedicationsPage() {
    pathHelper.gotoPage(["admin", "medications"])
  }

  gotoPharmacyChainsPage() {
    pathHelper.gotoPage(["pharmacy-chains"])
  }

  gotoPharmacyStoresPage() {
    pathHelper.gotoPage(["pharmacy-stores"])
  }

  gotoPhysiciansPage() {
    pathHelper.gotoPage(["admin", "physicians"])
  }

  gotoSystemSettingsPage() {
    pathHelper.gotoPage(["admin", "system-settings"])
  }

  gotoUsersPage() {
    pathHelper.gotoPage(["users"])
  }

  home() {
    const userCredentials = userCredentialsHelper.get()
    if (valueHelper.isValue(userCredentials)) {
      pathHelper.gotoPage(["dashboard"])
      return
    }

    pathHelper.gotoPage([])
  }

  launchModal(modalName, propsForModal = {}) {
    this.addField("modal", { modalName, ...propsForModal })
    this.clearAlert()
  }

  loadContext(nextOperation) {
    contextHelper.updateContext(nextOperation)
  }

  loadData() {
    let dataToKeep = ['lastLocation', 'modal']
    if (window.location.pathname != this.data.lastLocation) {
      dataToKeep = ['lastLocation']
      this.addField('lastLocation', window.location.pathname)
    }
    this.clearData(false, dataToKeep)
    this.getCurrentUser(
      () => {
        this.getCurrentAdminUser(
          () => {
            this.loadContext(
              (context) => {
                this.addField("context", context)
                this.redrawView()
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
    authenticationApi.signOut(apiEnvironmentHelper.apiEnvironment(userCredentials), this.home)
  }
}

export { AppViewModel }
