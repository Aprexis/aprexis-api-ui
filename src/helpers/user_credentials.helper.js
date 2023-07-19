import CryptoJS from "crypto-js"
import { dateHelper, userApi, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper } from "./api_environment.helper"

export const userCredentialsHelper = {
  actAs,
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
  setUsernamePassword
}

const mySecretKey = process.env.REACT_APP_APREXIS_KEY

function refreshCredentials(agingUsername, agingToken, userType, getFunction, setFunction) {
  const workingCredentials = getFunction()
  if (!valueHelper.isValue(workingCredentials) || workingCredentials.username != agingUsername || workingCredentials.token != agingToken) {
    return
  }
  if (userType == 'user') {
    const userCredentials = userCredentialsHelper.getAdmin()
    if (userCredentials.username == agingUsername) {
      return
    }
  }

  userApi.refreshToken(
    apiEnvironmentHelper.apiEnvironment(workingCredentials),
    (newUserCredentials) => { setFunction(newUserCredentials) }
  )
}

function requestRefreshCredentials(userCredentials, userType, getFunction, setFunction) {
  const { username, token, expires } = userCredentials
  const expireTime = dateHelper.makeDate(expires)
  const now = Date.now()
  const difference = expireTime.getTime() - now
  const tenMinutes = 10 * 60 * 1000
  const delay = Math.max(60 * 1000, difference - tenMinutes)

  setTimeout(refreshCredentials, delay, username, token, userType, getFunction, setFunction)
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

function set(userCredentials) {
  sessionStorage.setItem("aprexis-user-credentials", encode(userCredentials))
  requestRefreshCredentials(userCredentials, 'user', userCredentialsHelper.get, userCredentialsHelper.set)
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
