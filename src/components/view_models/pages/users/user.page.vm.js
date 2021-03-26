import { AbstractPageViewModel } from '../'
import { userApi } from '../../../../api'
import { userCredentialsHelper } from '../../../../helpers'

class UserPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const { pathEntries } = this.props
    const user_id = pathEntries.users.value
    userApi.account(userCredentials, user_id, (user) => { this.addField('user', user, this.redraw) }, this.onError)
  }
}

export { UserPageViewModel }
