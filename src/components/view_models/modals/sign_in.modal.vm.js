import { authenticationApi, userApi } from '../../../api'
import { alertHelper, userCredentialsHelper, userHelper, valueHelper } from '../../../helpers'
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
        userApi.show(
          userCredentials,
          userCredentials.id,
          (currentUser) => {
            userHelper.setCurrentUser(currentUser)

            if (valueHelper.isFunction(nextOperation)) {
              nextOperation()
            }
          },
          this.onError
        )
      },
      this.onError
    )
  }

  submitModal() {
    const { updateView } = this.props
    const { username, password } = this.data

    this.signIn(username, password, () => { this.toggleModal(updateView) })
  }
}

export { SignInModalViewModel }

