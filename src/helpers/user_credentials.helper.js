import CryptoJS from "crypto-js"
import { dateHelper, userApi, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper } from "./api_environment.helper"

export const userCredentialsHelper = {
  actAs,
  forceRefresh,
  get,
  getAdmin,
  getStatus,
  getUsernamePassword,
  remove,
  removeStatus,
  removeUsernamePassword,
  set,
  setAdmin,
  setStatus,
  setUsernamePassword,
  timeoutDelay
}

const mySecretKey = process.env.REACT_APP_APREXIS_KEY

function forceRefresh(workingCredentials, setFunction) {
  userApi.refreshToken(
    apiEnvironmentHelper.apiEnvironment(workingCredentials),
    (newUserCredentials) => { setFunction(newUserCredentials) }
  )
}

function refreshCredentials(agingUsername, agingToken, userType, getFunction, setFunction, logoutOrRefresh) {
  const workingCredentials = getFunction()
  if (!valueHelper.isValue(workingCredentials) || workingCredentials.username != agingUsername || workingCredentials.token != agingToken) {
    return
  }

  let userCredentials
  let adminCredentials
  switch (userType) {
    case 'user':
      userCredentials = workingCredentials
      adminCredentials = getAdmin()
      break;

    case 'admin':
      userCredentials = get()
      adminCredentials = workingCredentials
      break;

    default:
      console.log(`Unrecognized user type ${userType} for refresh`)
      return
  }

  if (valueHelper.isValue(adminCredentials) && (userCredentials.username != adminCredentials.username)) {
    if (userType == 'user') {
      userCredentialsHelper.forceRefresh(workingCredentials, setFunction)
      return
    }
  }

  performRefresh(userType, workingCredentials, userCredentials, setFunction, logoutOrRefresh)

  function performRefresh(userType, workingCredentials, userCredentials, setFunction, logoutOrRefresh) {
    let setMethod = setFunction
    if ((userType == 'admin') && (userCredentials.username == workingCredentials.username)) {
      setMethod = (newUserCredentials) => {
        sessionStorage.setItem("aprexis-user-credentials", encode(newUserCredentials))
        setFunction(newUserCredentials)
      }
    }

    if (valueHelper.isFunction(logoutOrRefresh)) {
      logoutOrRefresh(workingCredentials, (credentials) => { userCredentialsHelper.forceRefresh(credentials, setMethod) })
      return
    }

    userCredentialsHelper.forceRefresh(workingCredentials, setMethod)
  }
}

function requestRefreshCredentials(userCredentials, userType, getFunction, setFunction, logoutOrRefresh) {
  const { username, token } = userCredentials
  const delay = userCredentialsHelper.timeoutDelay(userCredentials)
  setTimeout(refreshCredentials, delay, username, token, userType, getFunction, setFunction, logoutOrRefresh)
}

function decode(cipherText) {
  if (!valueHelper.isValue(cipherText)) {
    return
  }

  const bytes = CryptoJS.AES.decrypt(cipherText, mySecretKey);
  const json = bytes.toString(CryptoJS.enc.Utf8)
  if (!valueHelper.isStringValue(json)) {
    return
  }

  return JSON.parse(json);
}

function encode(credentials) {
  return CryptoJS.AES.encrypt(JSON.stringify(credentials), mySecretKey).toString()
}

function actAs(userCredentials) {
  let adminCredentials = userCredentialsHelper.getAdmin()
  if (!valueHelper.isValue(adminCredentials)) {
    userCredentialsHelper.setAdmin(userCredentialsHelper.get())
  }

  userCredentialsHelper.set(userCredentials)
}

function get() {
  return decode(sessionStorage.getItem("aprexis-user-credentials"))
}

function getAdmin() {
  const adminCipherText = sessionStorage.getItem("aprexis-admin-credentials")

  if (!valueHelper.isValue(adminCipherText)) {
    return userCredentialsHelper.get()
  }

  return decode(adminCipherText)
}

function getStatus() {
  const credentialsStateCypherText = sessionStorage.getItem("aprexis-credentials-state")
  if (!valueHelper.isValue(credentialsStateCypherText)) {
    return { at: Date.now(), status: "" }
  }

  const state = decode(credentialsStateCypherText)
  if (!valueHelper.isValue(state)) {
    return { at: Date.now(), status: "" }
  }

  return state
}

function getUsernamePassword() {
  return decode(sessionStorage.getItem("aprexis-username-password"))
}

function remove() {
  let credentials = userCredentialsHelper.getAdmin()
  if (!valueHelper.isValue(credentials)) {
    credentials = userCredentialsHelper.get()
  }

  clear()

  return credentials

  function clear() {
    sessionStorage.removeItem("aprexis-admin-credentials")
    sessionStorage.removeItem("aprexis-user-credentials")
  }
}

function removeStatus() {
  sessionStorage.removeItem("aprexis-credentials-state")
}

function removeUsernamePassword() {
  sessionStorage.removeItem("aprexis-username-password")
}

function set(userCredentials, logoutOrRefresh) {
  sessionStorage.setItem("aprexis-user-credentials", encode(userCredentials))
  requestRefreshCredentials(userCredentials, 'user', userCredentialsHelper.get, userCredentialsHelper.set, logoutOrRefresh)
}

function setAdmin(adminCredentials) {
  sessionStorage.setItem("aprexis-admin-credentials", encode(adminCredentials))
  requestRefreshCredentials(adminCredentials, 'admin', userCredentialsHelper.getAdmin, userCredentialsHelper.setAdmin)
}

function setStatus(status) {
  const credentialsState = { at: Date.now(), status }

  sessionStorage.setItem("aprexis-credentials-state", encode(credentialsState))
}

function setUsernamePassword(username, password) {
  sessionStorage.setItem("aprexis-username-password", encode({ username, password }))
}

function timeoutDelay(userCredentials) {
  const { expires } = userCredentials
  const expireTime = dateHelper.makeDate(expires)
  const now = Date.now()
  const difference = expireTime.getTime() - now
  const fiveMinutes = 5 * 60 * 1000
  const tenMinutes = 10 * 60 * 1000

  if (difference < tenMinutes) {
    return difference / 2
  }

  return fiveMinutes
}
