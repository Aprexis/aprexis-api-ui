import { valueHelper } from "@aprexis/aprexis-api-utility"
import { alertHelper } from "./alert.helper"
import { pathHelper } from "./path.helper"
import { apiEnvironmentHelper } from "./api_environment.helper"
import { userCredentialsHelper } from "./user_credentials.helper"
import { pathKeys } from "../types"

export const contextHelper = {
  currentContext,
  gotoPlural,
  gotoSingular,
  inContext,
  modelNameFromPathKey,
  modelToBreadcrumb,
  putModelIntoContext,
  updateContext
}

function currentContext() {
  const contextJSON = sessionStorage.getItem("aprexis-api-ui-context")

  return JSON.parse(contextJSON)
}

function gotoPlural(orderedPathEntries, pathKey) {
  const pathParts = []
  for (let pathEntryIdx = 0; pathEntryIdx < orderedPathEntries.length; ++pathEntryIdx) {
    const pathEntry = orderedPathEntries[pathEntryIdx]
    const { key, value } = pathEntry

    pathParts.push(key)
    if (key == pathKey) {
      break
    }

    if (valueHelper.isValue(value)) {
      pathParts.push(value)
    }
  }

  pathHelper.gotoPage(pathParts)
}

function gotoSingular(orderedPathEntries, pathKey) {
  const pathParts = []
  for (let pathEntryIdx = 0; pathEntryIdx < orderedPathEntries.length; ++pathEntryIdx) {
    const pathEntry = orderedPathEntries[pathEntryIdx]
    const { key, value } = pathEntry

    pathParts.push(key)
    if (valueHelper.isValue(value)) {
      pathParts.push(value)
    }

    if (key == pathKey) {
      pathParts.push('profile')
      break
    }
  }

  pathHelper.gotoPage(pathParts)
}

function inContext(pathKey) {
  if (!valueHelper.isStringValue(pathKey)) {
    return
  }

  const context = contextHelper.currentContext()
  return valueHelper.isValue(context[pathKey])
}

function modelNameFromPathKey(pathKey) {
  if (!valueHelper.isStringValue(pathKey) || !valueHelper.isValue(pathKeys[pathKey])) {
    return
  }

  return pathKeys[pathKey].modelName
}

function modelToBreadcrumb(pathKey, model) {
  if (!valueHelper.isStringValue(pathKey) || !valueHelper.isValue(pathKeys[pathKey])) {
    return
  }

  return pathKeys[pathKey].helper.toBreadcrumb(model)
}

function putModelIntoContext(pathKey, model) {
  let context = contextHelper.currentContext()
  if (!valueHelper.isValue(context)) {
    context = {}
  }
  context[pathKey] = model

  const contextJSON = JSON.stringify(context)
  sessionStorage.setItem("aprexis-api-ui-context", contextJSON)
}

function updateContext(reconnectAndRetry, nextOperation) {
  const userCredentials = userCredentialsHelper.get()
  const pathEntries = pathHelper.parsePathEntries(window.location)
  const context = contextHelper.currentContext()
  const contextKeys = Object.keys(pathEntries).filter(
    (pathKey) => {
      if (!valueHelper.isValue(pathKeys[pathKey])) {
        return false
      }

      const pathEntry = pathEntries[pathKey]
      const { value } = pathEntry
      if (!valueHelper.isValue(value) || isNaN(value)) {
        return false
      }

      return true
    }
  )

  loadModelIntoContext(userCredentials, reconnectAndRetry, contextKeys, 0, pathEntries, context, nextOperation)
  return

  function loadModelIntoContext(userCredentials, reconnectAndRetry, contextKeys, contextKeyIdx, pathEntries, context, nextOperation) {
    let workingContext = { ...context }

    if (!valueHelper.isValue(contextKeys) || contextKeyIdx === contextKeys.length) {
      workingContext = removeOutdatedModelsFromContext(contextKeys, workingContext)

      const contextJSON = JSON.stringify(workingContext)
      sessionStorage.setItem("aprexis-api-ui-context", contextJSON)

      if (valueHelper.isFunction(nextOperation)) {
        nextOperation(workingContext)
      }

      return
    }

    const pathKey = contextKeys[contextKeyIdx]
    const pathEntry = pathEntries[pathKey]
    const { value } = pathEntry
    pathKeys[pathKey].api.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, reconnectAndRetry),
      value,
      (model) => {
        workingContext[pathKey] = model
        loadModelIntoContext(userCredentials, reconnectAndRetry, contextKeys, contextKeyIdx + 1, pathEntries, workingContext, nextOperation)
      },
      (message) => {
        alertHelper.error(message)
        if (valueHelper.isValue(nextOperation)) {
          nextOperation()
        }
      }
    )

    return

    function removeOutdatedModelsFromContext(contextKeys, context) {
      const workingContext = { ...context }

      Object.keys(workingContext).filter((key) => !contextKeys.includes(key)).forEach(
        (key) => {
          delete workingContext[key]
        }
      )

      return workingContext
    }
  }
}
