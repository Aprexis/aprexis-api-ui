import { valueHelper } from './'

export const pathHelper = {
  orderedPathEntries,
  pageName,
  parsePathEntries
}

function orderedPathEntries(pathEntries) {
  const ordered = Array(pathEntries.length).fill()

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

  if (group.endsWith('s')) {
    group = group.slice(0, -1)
  }

  return `${group}-${page}`
}

function parsePathEntries(location) {
  const { pathname } = location
  const parts = pathname.split('/')
  const pathEntries = {}

  let index = 1
  for (let idx = 0; idx < parts.length; ++idx) {
    const part = parts[idx]
    if (!valueHelper.isStringValue(part)) {
      continue
    }

    pathEntries[part] = { index }

    const valueIdx = idx + 1
    if (valueIdx < parts.length && (parts[valueIdx] == 'new' || !isNaN(parts[valueIdx]))) {
      pathEntries[part].value = parts[valueIdx]
      idx = valueIdx
    }

    ++index
  }

  return pathEntries
}
