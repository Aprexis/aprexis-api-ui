export const apiHelper = {
  toJSON
}

function toJSON(model, modelKeys) {
  return Object.keys(model).filter((key) => modelKeys.includes(key))
    .reduce(
      (newJson, key) => {
        newJson[key] = model[key]
        return newJson
      },
      {}
    )
}
