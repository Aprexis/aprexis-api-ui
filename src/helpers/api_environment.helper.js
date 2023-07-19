export const apiEnvironmentHelper = {
  apiEnvironment
}

const apiPathValues = apiPath()

function apiPath() {
  const baseApiUrl = determineApi()
  const railsUrlRoot = determineRails(baseApiUrl)

  return { baseApiUrl, railsUrlRoot }

  function determineApi() {
    return process.env.REACT_APP_APREXIS_API
  }

  function determineRails(baseApiUrl) {
    return new URL(baseApiUrl).pathname
  }
}

function apiEnvironment(userCredentials, reconnectAndRetry) {
  return { ...apiPathValues, reconnectAndRetry, userCredentials }
}
