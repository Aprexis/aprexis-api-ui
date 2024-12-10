import moment from 'moment'
import { valueHelper, } from '@aprexis/aprexis-api-utility'
import { AbstractModalViewModel } from './'

class LogoutOrRefreshModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
    this.logout = this.logout.bind(this)
    this.refreshCredentials = this.refreshCredentials.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.timer = this.timer.bind(this)
  }

  loadData() {
    this.clearData(false)

    const { startTime, sessionTimeout } = this.props
    let logoutIn = 5 * 60
    const timeoutIn = sessionTimeout / 2
    if (logoutIn > timeoutIn) {
      logoutIn = timeoutIn
    }
    const expireAt = moment.unix(startTime).add(logoutIn, 'seconds')
    this.addData({ expireAt: expireAt.unix() }, this.redrawView)
  }

  logout() {
    this.clearData(false)
    const { clearModal, signOut, toggleModal } = this.props

    toggleModal(() => { clearModal(signOut) })
  }

  refreshCredentials() {
    this.props.toggleModal(() => { this.props.clearModal(this.props.restartIdle) })
  }

  submitModal(keepAlive) {
    if (valueHelper.isSet(keepAlive)) {
      this.refreshCredentials()
      return
    }

    this.logout()
  }

  timer() {
    const { expireAt } = this.data
    if (!valueHelper.isValue(expireAt)) {
      this.redrawView()
      return
    }

    const now = moment()
    const duration = moment.duration(moment.unix(expireAt).diff(now))
    if (duration.valueOf() > 0) {
      this.redrawView()
      return
    }

    this.logout()
  }
}

export { LogoutOrRefreshModalViewModel }
