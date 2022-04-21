import { valueHelper } from "./value.helper"

export const apiHelper = {
  toJSON
}

function mapJSON(model, modelKey) {
  if (valueHelper.isStringValue(modelKey)) {
    return {
      jsonKey: modelKey, json: model[modelKey]
    }
  }

  const { key, jsonKey, childKeys } = modelKey
  return { jsonKey, json: apiHelper.toJSON(model[key], childKeys) }
}

function toJSON(model, modelKeys) {
  return Object.keys(model).filter((key) => modelKeys.includes(key))
    .reduce(
      (newJson, key) => {
        const { jsonKey, json } = mapJSON(model, key)

        newJson[jsonKey] = json
        return newJson
      },
      {}
    )
}
