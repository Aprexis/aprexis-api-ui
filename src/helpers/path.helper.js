import { history, valueHelper } from "./"

const reactUIRoot = process.env.REACT_APP_RELATIVE_URL_ROOT
const myUIRoot = valueHelper.isStringValue(reactUIRoot) ? reactUIRoot : ""

export const pathHelper = {
  buildPathArray,
  gotoPage,
  haveProfile,
  id,
  isPlural,
  isSingular,
  orderedPathEntries,
  pageName,
  parsePathEntries,
  pluralPrefix,
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

function gotoPage(pathArray) {
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

  if (valueHelper.isStriingValue(myUIRoot) && !path.startsWith(myUIRoot)) {
    path = `${myUIRoot}${path}`
  }

  history.push(path)
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
  const model = pathEntries[pathKey]

  if (!valueHelper.isValue(model)) {
    return
  }

  return model.value
}

function isPlural(pathEntries, pathKey) {
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
    if (valueIdx < parts.length && (parts[valueIdx] == "new" || !isNaN(parts[valueIdx]))) {
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

function singularPrefix(location, pluralName, singularId) {
  return `${pathHelper.pluralPrefix(location, pluralName)}/${singularId}`
}
