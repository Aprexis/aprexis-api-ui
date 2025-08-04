import { valueHelper } from "@aprexis/aprexis-api-utility"

export const apiEnvironmentHelper = {
  apiEnvironment,
  aprexisEnvironment,
  determineApiPath
}

const apiPathValues = apiPath()

function apiPath() {
  const baseApiUrl = apiEnvironmentHelper.determineApiPath()
  const railsUrlRoot = determineRails(baseApiUrl)

  return { baseApiUrl, railsUrlRoot }

  function determineRails(baseApiUrl) {
    return new URL(baseApiUrl).pathname
  }
}

function apiEnvironment(userCredentials, reconnectAndRetry) {
  return { ...apiPathValues, reconnectAndRetry, userCredentials }
}

function determineApiPath() {
  return process.env.REACT_APP_APREXIS_API
}

function aprexisEnvironment() {
  if (valueHelper.isStringValue(process.env.REACT_APP_APREXIS_ENVIRONEMNT)) {
    return process.env.REACT_APP_APREXIS_ENVIRONEMNT
  }

  const baseApiUrl = apiEnvironmentHelper.determineApiPath()
  if (baseApiUrl.includes('portal.aprexis.com')) {
    return 'production'
  } else if (baseApiUrl.includes('staging.aprexis.com')) {
    return 'staging'
  } else if (baseApiUrl.includes('demo.aprexis.com')) {
    return 'demo'
  }

  return 'development'
}
