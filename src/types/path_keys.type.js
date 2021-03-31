import { userApi } from '../api'
import { userHelper } from '../helpers'

const pathKeys = {
  "users": {
    api: userApi,
    helper: userHelper,
    modelName: "User"
  }
}

export { pathKeys }
