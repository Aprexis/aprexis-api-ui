import { alertHelper, pathHelper, userCredentialsHelper, valueHelper } from './'
import { pathKeys } from '../types'

export const contextHelper = {
  currentContext,
  gotoPlural,
  gotoSingular,
  modelNameFromPathKey,
  modelToBreadcrumb,
  putModelIntoContext,
  updateContext
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

function gotoSingular(orderedPathEntries, pathKey, model) {
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

function currentContext() {
  const contextJSON = sessionStorage.getItem("aprexis-api-ui-context")

  return JSON.parse(contextJSON)
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

function updateContext(nextOperation) {
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

      if (!valueHelper.isValue(context)) {
        return true
      }

      const existingModel = context[pathKey]
      return !valueHelper.isValue(existingModel) || existingModel.id != value
    }
  )

  loadModelIntoContext(userCredentials, contextKeys, 0, pathEntries, context, nextOperation)
  return

  function loadModelIntoContext(userCredentials, contextKeys, contextKeyIdx, pathEntries, context, nextOperation) {
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
      userCredentials,
      value,
      (model) => {
        workingContext[pathKey] = model
        loadModelIntoContext(userCredentials, contextKeys, contextKeyIdx + 1, pathEntries, workingContext, nextOperation)
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
