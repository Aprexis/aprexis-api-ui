import { authenticationApi, valueHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper, authenticationHelper, userCredentialsHelper } from '../../../helpers/index.js'
import { AbstractModalViewModel } from './abstract.modal.vm.js'

class SignInModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
    this.signIn = this.signIn.bind(this)
    this.submitModal = this.submitModal.bind(this)
  }

  loadData() {
    this.clearData(false)
    this.addData(
      {
        username: '',
        password: ''
      },
      this.redrawView
    )
  }

  signIn(username, password, uuid, nextOperation) {
    alertHelper.clear()

    authenticationApi.signIn(
      apiEnvironmentHelper.apiEnvironment(),
      username,
      password,
      uuid,
      (userCredentials) => {
        userCredentialsHelper.set(userCredentials, this.props.logoutOrRefresh)
        if (valueHelper.isFunction(nextOperation)) {
          nextOperation()
        }
      },
      this.onError
    )
  }

  submitModal() {
    const { updateView } = this.props
    const { username, password } = this.data
    const uuid = authenticationHelper.makeUuid()

    this.signIn(
      username,
      password,
      uuid,
      () => {
        this.toggleModal(() => { updateView(username, password) })
      }
    )
  }
}

export { SignInModalViewModel }

