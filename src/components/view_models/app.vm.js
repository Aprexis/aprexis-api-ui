import moment from 'moment'
import { AbstractViewModel } from "./"
import { authenticationApi, userApi, valueHelper } from '@aprexis/aprexis-api-utility'
import {
  alertHelper,
  apiEnvironmentHelper,
  authenticationHelper,
  contextHelper,
  pathHelper,
  userCredentialsHelper
} from "../../helpers"

class AppViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.actAs = this.actAs.bind(this)
    this.active = this.active.bind(this)
    this.clearAlert = this.clearAlert.bind(this)
    this.error = this.error.bind(this)
    this.forceRefresh = this.forceRefresh.bind(this)
    this.getCurrentAdminUser = this.getCurrentAdminUser.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.gotoAccount = this.gotoAccount.bind(this)
    this.gotoBillingClaimHistoryCollectionsPage = this.gotoBillingClaimHistoryCollectionsPage.bind(this)
    this.gotoBillingInvoicesPage = this.gotoBillingInvoicesPage.bind(this)
    this.gotoConditionMedicationsPage = this.gotoConditionMedicationsPage.bind(this)
    this.gotoDiagnosisCodesPage = this.gotoDiagnosisCodesPage.bind(this)
    this.gotoDiseasesPage = this.gotoDiseasesPage.bind(this)
    this.gotoGoldStandardPage = this.gotoGoldStandardPage.bind(this)
    this.gotoHealthPlansPage = this.gotoHealthPlansPage.bind(this)
    this.gotoLabTestPage = this.gotoLabTestsPage.bind(this)
    this.gotoLoadProvidersPage = this.gotoLoadProvidersPage.bind(this)
    this.gotoMedicationsPage = this.gotoMedicationsPage.bind(this)
    this.gotoNadacPricesPage = this.gotoNadacPricesPage.bind(this)
    this.gotoPharmacyChainsPage = this.gotoPharmacyChainsPage.bind(this)
    this.gotoPharmacyStoresPage = this.gotoPharmacyStoresPage.bind(this)
    this.gotoPhysiciansPage = this.gotoPhysiciansPage.bind(this)
    this.gotoPotentiallyInappropriateMedicationsPage = this.gotoPotentiallyInappropriateMedicationsPage.bind(this)
    this.gotoSystemSettingsPage = this.gotoSystemSettingsPage.bind(this)
    this.gotoUsersPage = this.gotoUsersPage.bind(this)
    this.home = this.home.bind(this)
    this.idle = this.idle.bind(this)
    this.launchModal = this.launchModal.bind(this)
    this.loadContext = this.loadContext.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadSessionTimeout = this.loadSessionTimeout.bind(this)
    this.loadUserContext = this.loadUserContext.bind(this)
    this.modalClose = this.modalClose.bind(this)
    this.modalOpen = this.modalOpen.bind(this)
    this.mounted = this.mounted.bind(this)
    this.reconnectAndRetry = this.reconnectAndRetry.bind(this)
    this.restartIdle = this.restartIdle.bind(this)
    this.selectCurrentUser = this.selectCurrentUser.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.startForUser = this.startForUser.bind(this)
    this.timer = this.timer.bind(this)

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
      apiEnvironmentHelper.apiEnvironment(adminCredentials, this.reconnectAndRetry),
      value,
      this.selectCurrentUser,
      this.onError
    )
    return
  }

  active(_event) {
    const lastActiveAt = moment().unix()
    this.addField("lastActiveAt", lastActiveAt)
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

  forceRefresh(nextOperation) {
    const userCredentials = userCredentialsHelper.get()
    if (!valueHelper.isValue(userCredentials)) {
      return
    }

    const adminCredentials = userCredentialsHelper.getAdmin()
    if (adminCredentials.user_id == userCredentials.user_id) {
      userCredentialsHelper.forceRefresh(
        userCredentials,
        (newUserCredentials) => {
          userCredentialsHelper.set(newUserCredentials)
          nextOperation()
        }
      )
      return
    }

    userCredentialsHelper.forceRefresh(
      adminCredentials,
      (newAdminCredentials) => {
        userCredentialsHelper.setAdmin(newAdminCredentials)
        userCredentialsHelper.forceRefresh(
          userCredentials,
          (newUserCredentials) => {
            userCredentialsHelper.set(newUserCredentials)
            nextOperation()
          }
        )
      }
    )
  }

  getCurrentAdminUser(nextOperation) {
    const adminCredentials = userCredentialsHelper.getAdmin()
    if (!valueHelper.isValue(adminCredentials)) {
      nextOperation()
      return
    }

    userApi.account(
      apiEnvironmentHelper.apiEnvironment(adminCredentials, this.reconnectAndRetry),
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
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.reconnectAndRetry),
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
    pathHelper.gotoPage(["billing", "billing-claim-history-collections"])
  }

  gotoBillingInvoicesPage() {
    pathHelper.gotoPage(["billing", "billing-invoices"])
  }

  gotoConditionMedicationsPage() {
    pathHelper.gotoPage(["admin", "condition-medications"])
  }

  gotoDiagnosisCodesPage() {
    pathHelper.gotoPage(["admin", "diagnosis-codes"])
  }

  gotoDiseasesPage() {
    pathHelper.gotoPage(["admin", "diseases"])
  }

  gotoGoldStandardPage() {
    pathHelper.gotoPage(["admin", "gold-standard"])
  }

  gotoHealthPlansPage() {
    pathHelper.gotoPage(["health-plans"])
  }

  gotoLabTestsPage() {
    pathHelper.gotoPage(["admin", "lab-tests"])
  }

  gotoLoadProvidersPage() {
    pathHelper.gotoPage(["admin", "load-providers"])
  }

  gotoMedicationsPage() {
    pathHelper.gotoPage(["admin", "medications"])
  }

  gotoNadacPricesPage() {
    pathHelper.gotoPage(["admin", "nadac-prices"])
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

  gotoPotentiallyInappropriateMedicationsPage() {
    pathHelper.gotoPage(["admin", "potentially-inappropriate-medications"])
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

  idle(_event) {
    const lastIdleAt = moment().unix()
    this.addField("lastIdleAt", lastIdleAt)
  }

  launchModal(modalName, propsForModal = {}) {
    this.addField("modal", { modalName, ...propsForModal })
    this.clearAlert()
  }

  loadContext(nextOperation) {
    contextHelper.updateContext(this.reconnectAndRetry, nextOperation)
  }

  loadData() {
    let dataToKeep = ['lastLocation']
    if (window.location.pathname == this.data.lastLocation) {
      dataToKeep.push('modal')
    } else {
      this.addField('lastLocation', window.location.pathname)
    }
    this.clearData(false, dataToKeep)
    this.addData({ lastActiveAt: moment().unix(), lastIdleAt: 0, waitLogoutOrRefresh: false })

    this.loadUserContext()
  }

  loadSessionTimeout(nextOperation) {
    const userCredentials = userCredentialsHelper.get()
    if (!valueHelper.isValue(userCredentials)) {
      nextOperation()
      return
    }

    userApi.userSessionTimeout(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.reconnectAndRetry),
      (userSessionInfo) => {
        this.addField("sessionTimeout", userSessionInfo.timeout_in)
        nextOperation()
      }
    )
  }

  loadUserContext() {
    this.addField("alreadyLoaded", true)
    this.getCurrentUser(
      () => {
        this.getCurrentAdminUser(
          () => {
            this.loadSessionTimeout(
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
    )
  }

  modalClose(nextOperation) {
    this.addField("modalIsOpen", false, () => { this.redrawView(nextOperation) })
  }

  modalOpen(nextOperation) {
    this.addField("modalIsOpen", true, () => { this.redrawView(nextOperation) })
  }

  mounted() {
    this.addData({ lastActiveAt: 0, lastIdleAt: 0, waitLogoutOrRefresh: false })
    this.forceRefresh(this.loadUserContext)
  }

  reconnectAndRetry(error, workingCredentials, retryAfterReconnect) {
    const { onError } = this
    const { username, password } = userCredentialsHelper.getUsernamePassword()
    if (!valueHelper.isStringValue(username) || !valueHelper.isStringValue(password)) {
      onError(error)
      return
    }
    if (alreadyUpdatedOrUpdating()) {
      return
    }

    signinAndRetry()

    function alreadyUpdatedOrUpdating() {
      const state = userCredentialsHelper.getStatus()
      if (!valueHelper.isValue(state)) {
        return false
      }

      switch (state.status) {
        case 'reconnected':
          if (Date.now() - state.at > 5 * 1000) {
            return false
          }
          reconnectedRetry()
          return true

        case 'reconnecting':
          reconnectingRetry()
          return true

        default:
          return false
      }
    }

    function reconnectedRetry() {
      const userCredentials = userCredentialsHelper.get()
      if (userCredentials.user_id == workingCredentials.user_id) {
        retryAfterReconnect(userCredentials)
        return
      }

      const adminCredentials = userCredentialsHelper.getAdmin()
      retryAfterReconnect(adminCredentials)
    }

    function reconnectingRetry() {
      const timeout = setTimeout(
        () => {
          const state = userCredentialsHelper.getStatus()

          if (valueHelper.isValue(state) && state.status == 'reconnected') {
            clearTimeout(timeout)
            reconnectedRetry()
          }
        },
        100
      )

      return
    }

    function signinAndRetry() {
      userCredentialsHelper.setStatus('reconnecting')
      const uuid = authenticationHelper.makeUuid()

      authenticationApi.signIn(
        apiEnvironmentHelper.apiEnvironment(),
        username,
        password,
        uuid,
        (userCredentials) => {
          reconnectActAsAndRetry(userCredentials)
        },
        onError
      )
    }

    function reconnectActAsAndRetry(newCredentials) {
      const existingAdminCredentials = userCredentialsHelper.getAdmin()
      const existingCredentials = userCredentialsHelper.get()

      if (existingCredentials.user_id != newCredentials.user_id) {
        userCredentialsHelper.setAdmin(newCredentials)
        userApi.actAs(
          apiEnvironmentHelper.apiEnvironment(newCredentials),
          existingCredentials.id,
          actingAsUser,
          onError
        )
        return
      }

      if (valueHelper.isValue(existingAdminCredentials)) {
        userCredentialsHelper.setAdmin(newCredentials)
      }
      userCredentialsHelper.set(newCredentials)
      userCredentialsHelper.setStatus('reconnected')

      if (valueHelper.isFunction(retryAfterReconnect)) {
        retryAfterReconnect(newCredentials)
      }

      function actingAsUser(userCredentials) {
        userCredentialsHelper.set(userCredentials)
        userCredentialsHelper.setStatus('reconnected')

        if (valueHelper.isFunction(retryAfterReconnect)) {
          retryAfterReconnect(workingCredentials.user_id == newCredentials.user_id ? newCredentials : userCredentials)
        }
      }
    }
  }

  restartIdle() {
    const now = moment().unix()
    this.addData(
      {
        lastIdleAt: now,
        waitLogoutOrRefresh: false
      },
      this.loadData
    )
  }

  selectCurrentUser(userCredentials) {
    const adminCredentials = userCredentialsHelper.getAdmin()

    userCredentialsHelper.setAdmin(adminCredentials)
    userCredentialsHelper.set(userCredentials)

    this.getCurrentAdminUser(() => { this.getCurrentUser(this.home) })
  }

  signIn() {
    this.launchModal("sign-in", { modalProps: { updateView: this.startForUser } })
    alertHelper.clear()
  }

  signOut() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.remove()
    authenticationApi.signOut(apiEnvironmentHelper.apiEnvironment(userCredentials), this.home, this.home)
  }

  startForUser(username, password) {
    userCredentialsHelper.setUsernamePassword(username, password)
    this.home()
  }

  timer() {
    const userCredentials = userCredentialsHelper.get()
    if (!valueHelper.isValue(userCredentials)) {
      return
    }
    const { lastActiveAt, lastIdleAt, waitLogoutOrRefresh } = this.data
    if (waitLogoutOrRefresh) {
      return
    }

    let { sessionTimeout } = this.data
    const now = moment().unix()
    if (!valueHelper.isNumberValue(sessionTimeout)) {
      sessionTimeout = 15 * 60
    }
    let idleTimeout = sessionTimeout - (5 * 60)
    if (idleTimeout < 0) {
      idleTimeout = sessionTimeout / 2
    }

    console.log(`Idling: ${lastActiveAt} ${now} - ${lastIdleAt} = ${now - lastIdleAt}? ${(lastIdleAt > lastActiveAt) && (now - lastIdleAt >= idleTimeout)}`)

    if ((lastIdleAt > lastActiveAt) && (now - lastIdleAt >= idleTimeout)) {
      this.addField("waitLogoutOrRefresh", true)
      this.launchModal(
        "logout-or-refresh",
        {
          modalProps: {
            restartIdle: this.restartIdle,
            sessionTimeout,
            startTime: now,
            signOut: this.signOut
          }
        }
      )
    }
  }
}

export { AppViewModel }
