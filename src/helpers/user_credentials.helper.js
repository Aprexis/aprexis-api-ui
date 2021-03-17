import CryptoJS from "crypto-js"
import { valueHelper } from "./value.helper"

export const userCredentialsHelper = {
  clear,
  get,
  remove,
  set
}

const mySecretKey = process.env.REACT_APP_APREXIS_KEY

function clear() {
  sessionStorage.removeItem("aprexis-user-credentials")
}

function get() {
  const ciphertext = sessionStorage.getItem("aprexis-user-credentials")
  if (!valueHelper.isValue(ciphertext)) {
    return
  }

  const bytes = CryptoJS.AES.decrypt(ciphertext, mySecretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

function remove() {
  const userCredentials = userCredentialsHelper.get()
  userCredentialsHelper.clear()

  return userCredentials
}

function set(userCredentials) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(userCredentials), mySecretKey).toString()
  sessionStorage.setItem("aprexis-user-credentials", ciphertext)
}
