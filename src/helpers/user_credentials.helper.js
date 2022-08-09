import CryptoJS from "crypto-js"
import { valueHelper } from "@aprexis/aprexis-api-utility"

export const userCredentialsHelper = {
  actAs,
  get,
  getAdmin,
  remove,
  set,
  setAdmin
}

const mySecretKey = process.env.REACT_APP_APREXIS_KEY

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
}

function setAdmin(adminCredentials) {
  sessionStorage.setItem("aprexis-admin-credentials", encode(adminCredentials))
}

