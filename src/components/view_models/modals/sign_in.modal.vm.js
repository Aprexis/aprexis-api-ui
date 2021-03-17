import { authenticationApi } from '../../../api'
import { alertHelper, userCredentialsHelper, valueHelper } from '../../../helpers'
import { AbstractModalViewModel } from './'

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
      }
    )
    this.redrawView()
  }

  signIn(username, password, nextOperation) {
    alertHelper.clear()

    authenticationApi.signIn(
      username,
      password,
      (userCredentials) => {
        userCredentialsHelper.set(userCredentials)
        if (valueHelper.isFunction(nextOperation)) {
          nextOperation()
        }
      }
    )
  }

  submitModal() {
    const { updateView } = this.props
    const { username, password } = this.data

    this.signIn(username, password, () => { this.toggleModal(updateView) })
  }
}

export { SignInModalViewModel }

