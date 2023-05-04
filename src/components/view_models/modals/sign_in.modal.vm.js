import { authenticationApi, valueHelper } from '@aprexis/aprexis-api-utility'
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid'
import { alertHelper, apiEnvironmentHelper, userCredentialsHelper } from '../../../helpers'
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
        userCredentialsHelper.set(userCredentials)
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
    const uuid = makeUuid()

    this.signIn(username, password, uuid, () => { this.toggleModal(updateView) })

    function makeUuid() {
      const nameSpace = "6fb78d24-34bb-489e-8459-2928fe5a7921"
      const application = 'aprexis-api-ui'

      return `${uuidv5(application, nameSpace)}-${uuidv4()}`
    }
  }
}

export { SignInModalViewModel }

