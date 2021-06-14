import { alertHelper, /*userCredentialsHelper,*/ valueHelper } from "../helpers"

export const API = {
  buildQueryString,
  handleError,
  perform,
  validateId
}

const baseApiUrl = process.env.REACT_APP_APREXIS_API
const railsUrlRoot = process.env.RAILS_RELATIVE_URL_ROOT
const knownHeaders = {
  "X-Page": "lastPage.number",
  "X-Per-Page": "lastPage.size",
  "X-Total": "lastPage.total"
}

function buildQueryString(params) {
  if (!valueHelper.isValue(params)) {
    return ""
  }

  let queryString = ""
  let delimiter = "?"
  Object.keys(params).forEach(
    (key) => {
      const value = params[key]
      if (Array.isArray(value)) {
        queryString = addArrayParam(key, value, queryString, delimiter)
      } else if (typeof value === "object" && !(value instanceof Date)) {
        queryString = addHashParam(key, value, queryString, delimiter)
      } else {
        queryString = addSingleParam(key, value, queryString, delimiter)
      }

      delimiter = "&"
    }
  )

  return queryString

  function addArrayParam(key, array, queryString, delimiter) {
    let myQueryString = queryString
    let myDelimiter = delimiter

    array.forEach(
      (value) => {
        myQueryString = `${myQueryString}${myDelimiter}${key}[]=${encodeURIComponent(value)}`
        myDelimiter = "&"
      }
    )

    return myQueryString
  }

  function addHashParam(key, hash, queryString, delimiter) {
    let myQueryString = queryString
    let myDelimiter = delimiter

    Object.keys(hash).forEach(
      (hashKey) => {
        const value = hash[hashKey]
        myQueryString = `${myQueryString}${myDelimiter}${key}[${hashKey}]=${encodeURIComponent(value)}`
        myDelimiter = "&"
      }
    )

    return myQueryString
  }

  function addSingleParam(key, value, queryString, delimiter) {
    return `${queryString}${delimiter}${key}=${encodeURIComponent(value)}`
  }
}

function handleError(method, path, error, onFailure) {
  if (error.message.includes("You need to sign in or sign up before continuing.")) {
    onFailure("You are not signed in. You may have been signed out due to lack of activity or your username may have been changed by another user. Please sign in.")
    return
  }

  const message = parseErrorMessage(method, path, error)
  if (valueHelper.isFunction(onFailure)) {
    onFailure(message)
    return
  }

  alertHelper.error(message)
  return

  function parseErrorMessage(method, path, error) {
    if (!valueHelper.isValue(error.message)) {
      return `HTTP: "${method} ${path}: ${error.error} (${error.status})"`
    }

    const parsedJSON = JSON.parse(error.message)
    return Object.keys(parsedJSON)
      .filter((key) => typeof parsedJSON[key] === "string" || Array.isArray(parsedJSON[key]))
      .map(
        (key) => {
          const part = parsedJSON[key]
          if (Array.isArray(part)) {
            return `${key}: ${part.join(" ")}`
          }

          return `${key}: ${part}`
        }
      ).join(" ")
  }
}

function perform(method, path, queryString, userCredentials, body, onSuccess, onFailure) {
  console.log(`railsUrlRoot: ${JSON.stringify(railsUrlRoot)}`)
  console.log(`baseApiUrl: ${JSON.stringify(baseApiUrl)}`)

  // Unless the incoming path includes the Rails relative URL root, add it.
  let workingPath = path
  if (valueHelper.isStringValue(railsUrlRoot) && !path.startsWith(railsUrlRoot)) {
    workingPath = `${railsUrlRoot}/${path}`
  }
  const fullPath = `${baseApiUrl}${workingPath}${queryString}`
  const requestOptions = {
    method,
    headers: {
      "Accept": "application/json"
    }
  }

  requestOptions.headers = addUserCredentials(requestOptions.headers, userCredentials)
  const headerBody = jsonBody(requestOptions.headers, body)
  requestOptions.headers = headerBody.headers
  requestOptions.body = headerBody.body

  fetch(fullPath, requestOptions).then(
    (response) => {
      const parsedHeaders = parseHeaders(response.headers)

      switch (response.status) {
        case 200:
        case 201:
          response.json()
            .then(
              (responseJSON) => {
                const parsedJSON = JSON.parse(JSON.stringify(responseJSON))
                onSuccess(parsedJSON, parsedHeaders)
              }
            )
          break

        case 204:
          onSuccess()
          break

        default:
          response.text().then((errorMessage) => API.handleError(method, path, { message: errorMessage }, onFailure))
      }
    }
  )
    .catch((error) => API.handleError(method, path, error, onFailure))
  return

  function addUserCredentials(existingHeaders, userCredentials) {
    if (!valueHelper.isValue(userCredentials)) {
      return existingHeaders
    }

    const { username, auth_token } = userCredentials
    const newHeaders = {
      ...existingHeaders,
      "X-User-Username": username,
      "X-User-Token": auth_token
    }

    return newHeaders
  }

  function jsonBody(existingHeaders, body) {
    if (!valueHelper.isValue(body)) {
      return { headers: { ...existingHeaders } }
    }

    if (body instanceof FormData) {
      return { headers: { ...existingHeaders }, body }
    }

    return {
      headers: {
        ...existingHeaders,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  }

  function parseHeaders(headers) {
    const parsedHeaders = { date: new Date() }

    Object.keys(knownHeaders).forEach(
      (key) => {
        const value = headers.get(key.toLowerCase())
        if (valueHelper.isValue(value)) {
          valueHelper.hashSet(parsedHeaders, knownHeaders[key], value)
        }
      }
    )

    return parsedHeaders
  }
}

function validateId(idType, id, onFailure, allowUndefined = false) {
  if (allowUndefined && !valueHelper.isValue(id)) {
    return true
  }

  if (!isNaN(id) && id > 0) {
    return true
  }

  const message = `${id} is not a valid ${idType}`
  if (valueHelper.isFunction(onFailure)) {
    onFailure(message)
    return false
  }

  alertHelper.error(message)
  return false
}
