import { history } from "./history"
import { dateHelper, valueHelper } from "@aprexis/aprexis-api-utility"

let reactUrlRoot = ""
if (valueHelper.isStringValue(process.env.REACT_APP_RELATIVE_URL_ROOT)) {
  reactUrlRoot = `${process.env.REACT_APP_RELATIVE_URL_ROOT}`.replace(/\/$/, '')
}

export const pathHelper = {
  buildPathArray,
  convertNameToFieldId,
  gotoPage,
  haveProfile,
  id,
  isPlural,
  isSingular,
  orderedPathEntries,
  pageName,
  parsePathEntries,
  pluralPrefix,
  root,
  singularPrefix
}

function buildPathArray(location, ...pathParts) {
  const { pathname } = location
  const pathnameParts = pathname.split("/")

  if (pathnameParts.length > 0 && pathnameParts[0].trim() == '') {
    pathnameParts.shift()
  }

  pathParts.forEach(
    (part) => {
      let value
      switch (typeof part) {
        case 'object':
          if (('model' in part) && ('idField' in part)) {
            value = part.model[part.idField]
            break
          }
          value = part.id
          break

        case 'string':
          value = part
          break

        default:
          value = `${part}`
      }

      pathnameParts.push(value)
    }
  )

  return pathnameParts
}

function convertNameToFieldId(name) {
  return `${name.substring(0, name.length - 1).replaceAll("-", "_")}_id`
}

function gotoPage(pathArray, ...params) {
  let path = ""
  pathArray.forEach(
    (pathEntry) => {
      if (typeof pathEntry === "object") {
        path = `${path}/${pathEntry.value}`
      } else if (!isNaN(pathEntry)) {
        path = `${path}/${pathEntry}`
      } else if (valueHelper.isStringValue(pathEntry)) {
        path = `${path}/${pathEntry}`
      }
    }
  )

  if (valueHelper.isStringValue(pathHelper.root()) && !path.startsWith(pathHelper.root())) {
    path = `${pathHelper.root()}${path}`
  }

  history.push(path, ...params)
}

function haveProfile(orderedPathEntries) {
  if (!Array.isArray(orderedPathEntries) ||
    orderedPathEntries.length === 0 ||
    !valueHelper.isValue(orderedPathEntries[orderedPathEntries.length - 1])) {
    return false
  }

  return orderedPathEntries[orderedPathEntries.length - 1].key == "profile"
}

function id(pathEntries, pathKey) {
  if (!valueHelper.isValue(pathEntries)) {
    return
  }

  const model = pathEntries[pathKey]
  if (!valueHelper.isValue(model)) {
    return
  }

  return model.value
}

function isPlural(pathEntries, pathKey) {
  if (!valueHelper.isValue(pathEntries)) {
    return
  }

  const model = pathEntries[pathKey]
  return valueHelper.isValue(model) && !valueHelper.isValue(model.value)
}

function isSingular(pathEntries, pathKey) {
  return valueHelper.isValue(pathHelper.id(pathEntries, pathKey))
}

function orderedPathEntries(pathEntries) {
  const ordered = Array(Object.keys(pathEntries).length).fill()

  Object.keys(pathEntries).forEach(
    (key) => {
      const pathEntry = pathEntries[key]
      const { index, value } = pathEntry
      ordered[index - 1] = {
        key,
        value
      }
    }
  )

  return ordered
}

function pageName(pathEntries) {
  const length = Object.keys(pathEntries).length
  const ordered = pathHelper.orderedPathEntries(pathEntries)
  let group = ordered[length - 2].key
  const page = ordered[length - 1].key

  if (group.endsWith("s")) {
    group = group.slice(0, -1)
  }

  return `${group}-${page}`
}

function parsePathEntries(location) {
  const { pathname } = location
  if (pathname == "/") {
    return {}
  }

  const pathEntries = {}
  const parts = pathname.split("/")
  let index = 1
  for (let idx = 0; idx < parts.length; ++idx) {
    const part = parts[idx]
    if (!valueHelper.isStringValue(part)) {
      continue
    }

    pathEntries[part] = { index }

    const valueIdx = idx + 1
    if (valueIdx < parts.length && (parts[valueIdx] == "new" || !isNaN(parts[valueIdx]) || dateHelper.isDateValue(parts[valueIdx]))) {
      pathEntries[part].value = parts[valueIdx]
      idx = valueIdx
    }

    ++index
  }

  return pathEntries
}

function pluralPrefix(location, pluralName) {
  const { pathname } = location
  const ppIdx = pathname.indexOf(pluralName)

  return `${pathname.substring(0, ppIdx)}${pluralName}`
}

function root() {
  return reactUrlRoot
}

function singularPrefix(location, pluralName, singularId) {
  return `${pathHelper.pluralPrefix(location, pluralName)}/${singularId}`
}
