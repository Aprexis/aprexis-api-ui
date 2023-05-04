import CryptoJS from "crypto-js"
import { dateHelper, userApi, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper } from "./api_environment.helper"

export const userCredentialsHelper = {
  actAs,
  get,
  getAdmin,
  remove,
  set,
  setAdmin
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
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
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

function set(userCredentials) {
  sessionStorage.setItem("aprexis-user-credentials", encode(userCredentials))
  requestRefreshCredentials(userCredentials, 'user', userCredentialsHelper.get, userCredentialsHelper.set)
}

function setAdmin(adminCredentials) {
  sessionStorage.setItem("aprexis-admin-credentials", encode(adminCredentials))
  requestRefreshCredentials(adminCredentials, 'admin', userCredentialsHelper.getAdmin, userCredentialsHelper.setAdmin)
}

