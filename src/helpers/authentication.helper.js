import { v4 as uuidv4, v5 as uuidv5 } from 'uuid'

export const authenticationHelper = {
  makeUuid
}

function makeUuid() {
  const nameSpace = "6fb78d24-34bb-489e-8459-2928fe5a7921"
  const application = 'aprexis-api-ui'

  return `${uuidv5(application, nameSpace)}-${uuidv4()}`
}
