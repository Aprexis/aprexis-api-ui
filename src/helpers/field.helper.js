import React from "react"
import { UncontrolledTooltip } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { contextHelper, dateHelper, jsEventHelper, valueHelper } from "./"

export const fieldHelper = {
  booleanDisplay,
  changeDate,
  changeDateTime,
  changeField,
  changeValue,
  changeValues,
  combineValues,
  dateDisplay,
  dateTimeDisplay,
  display,
  displayListField,
  displayWithUnits,
  dollarDisplay,
  fieldName,
  fieldXs,
  getField,
  imageDisplay,
  includeField,
  label,
  labelXs,
  listField,
  method,
  name,
  notInContextDisplay,
  options,
  optionDisplay,
  titleDisplay
}

function booleanDisplay(name, value, description) {
  return fieldHelper.display(name, valueHelper.yesNo(value), description, "?")
}

function changeDate(modelName, model, changedModel, fieldName, date, dateValid) {
  const nameValid = `${fieldName}_DVALID`
  const updatedValid = { ...model[nameValid], ...dateValid }
  return fieldHelper.changeValues(modelName, model, changedModel, { [fieldName]: date, [nameValid]: updatedValid })
}

function changeDateTime(modelName, model, changedModel, fieldName, dateTime, dateTimeValid) {
  const nameValid = `${fieldName}_DTVALID`
  const updatedValid = { ...model[nameValid], ...dateTimeValid }
  return fieldHelper.changeValues(modelName, model, changedModel, { [fieldName]: dateTime, [nameValid]: updatedValid })
}

function changeField(modelName, model, changedModel, event) {
  const { name, value } = jsEventHelper.fromInputEvent(event)

  return fieldHelper.changeValue(modelName, model, changedModel, name, value)
}

function changeValue(modelName, model, changedModel, name, value) {
  return {
    [modelName]: {
      ...model,
      [name]: value
    },
    [valueHelper.changedModelName(modelName)]: {
      ...changedModel,
      [name]: value
    }
  }
}

function changeValues(modelName, model, changedModel, changedValues) {
  let updated = {
    [modelName]: model,
    [valueHelper.changedModelName(modelName)]: changedModel
  }

  Object.keys(changedValues).forEach(
    (name) => {
      const value = changedValues[name]

      updated = fieldHelper.changeValue(
        modelName,
        updated[modelName],
        updated[valueHelper.changedModelName(modelName)],
        name,
        value
      )
    }
  )

  return {
    [modelName]: updated[modelName],
    [valueHelper.changedModelName(modelName)]: updated[valueHelper.changedModelName(modelName)]
  }
}

function combineValues(...values) {
  if (!valueHelper.isValue(values)) {
    return
  }

  const filteredValues = values.filter((value) => valueHelper.isStringValue(value))
  if (filteredValues.length === 0) {
    return
  }

  return filteredValues.join(" ")
}

function dateDisplay(name, value, description) {
  return fieldHelper.display(name, dateHelper.displayDate(value), description)
}

function dateTimeDisplay(name, value, description) {
  return fieldHelper.display(name, dateHelper.displayDateTime(value), description)
}

function display(name, value, description, suffix = ":") {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === "string" && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  if (!valueHelper.isValue(description)) {
    return (
      <React.Fragment><strong className="text-muted">{name}{suffix}</strong> {value}<br /></React.Fragment>
    )
  }

  const targetId = `description-${name.toLowerCase().replaceAll(" ", "-")}`
  return (
    <span>
      <strong className="text-muted">{name}{suffix}</strong> {value}&nbsp;
      <FontAwesomeIcon className="ml-1" icon={faInfoCircle} id={targetId} />
      <UncontrolledTooltip placement="top" boundariesElement="window" target={targetId}>
        {description}
      </UncontrolledTooltip>
      <br />
    </span>
  )
}

function displayListField(model, helper, heading) {
  const method = valueHelper.isStringValue(heading.method) ? heading.method : heading.field
  const value = helper[method](model)
  if (!valueHelper.isValue(value)) {
    return ""
  }

  const longValue = `${value}`
  if (!valueHelper.isValue(heading.maximum) || longValue.length <= heading.maximum) {
    return longValue
  }

  const targetId = `${heading.field.replaceAll(",", "_")}_${model.id}`
  return (
    <td>
      {longValue.substring(0, heading.maximum)}...
      <FontAwesomeIcon className="ml-1" icon={faInfoCircle} id={targetId} />
      <UncontrolledTooltip placement="top" boundariesElement="window" target={targetId}>
        {longValue}
      </UncontrolledTooltip>
    </td>
  )
}

function displayWithUnits(name, value, units, description) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === "string" && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, `${value} ${units}`, description)
}

function dollarDisplay(name, value, description) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === "string" && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, `$${value}`, description)
}

function fieldName(fieldName, prefix) {
  if (!valueHelper.isStringValue(prefix)) {
    return fieldName
  }

  return `${prefix}_${fieldName}`
}

function fieldXs(props) {
  const { fieldXs } = props
  if (valueHelper.isValue(fieldXs)) {
    return fieldXs
  }

  const { fieldXsTotal } = props
  if (!valueHelper.isValue(fieldXsTotal)) {
    return 10
  }

  return fieldXsTotal - fieldHelper.labelXs(props)
}

function getField(object, fieldName, prefix) {
  if (!valueHelper.isValue(object)) {
    return
  }

  return object[fieldHelper.fieldName(fieldName, prefix)]
}

function imageDisplay(name, value, description) {
  if (valueHelper.isStringValue(value)) {
    return fieldHelper.display(name, <img src={`data:image/jpeg;base64,${value}`} alt="logo" />, description)
  }

  return fieldHelper.display(name, "")
}

function includeField(pathEntries, filters, fieldHeader) {
  return includeIf(pathEntries, fieldHeader) &&
    includeIfFilters(filters, fieldHeader) &&
    includeUnless(pathEntries, fieldHeader) &&
    includeUnlessFilters(filters, fieldHeader)

  function includeCheckPathEntry(pathEntries, pathKeys) {
    if (!valueHelper.isValue(pathEntries)) {
      return false
    }

    const pathKeyEntries = pathKeys.split(",")

    return !valueHelper.isValue(
      pathKeyEntries.find(
        (pathKey) => {
          return !valueHelper.isValue(pathEntries[pathKey])
        }
      )
    )
  }

  function includeCheckFilters(filters, filtersToCheck) {
    if (!valueHelper.isValue(filters)) {
      return false
    }

    return !valueHelper.isValue(
      filtersToCheck.find(
        (filterToCheck) => {
          return filters[filterToCheck.queryParam] != filterToCheck.value
        }
      )
    )
  }

  function includeIf(pathEntries, fieldHeader) {
    if (!valueHelper.isValue(fieldHeader["if"])) {
      return true
    }

    return includeCheckPathEntry(pathEntries, fieldHeader["if"])
  }

  function includeIfFilters(filters, fieldHeader) {
    if (!valueHelper.isValue(fieldHeader["ifFilters"])) {
      return true
    }

    return includeCheckFilters(filters, fieldHelper["ifFilters"])
  }

  function includeUnless(pathEntries, fieldHeader) {
    if (!valueHelper.isValue(fieldHeader["unless"])) {
      return true
    }

    return !includeCheckPathEntry(pathEntries, fieldHeader["unless"])
  }

  function includeUnlessFilters(filters, fieldHeader) {
    if (!valueHelper.isValue(fieldHeader["unlessFilters"])) {
      return true
    }

    return !includeCheckFilters(filters, fieldHeader["unlessFilters"])
  }
}

function label({ fieldLabel, fieldMethod, fieldName }) {
  if (valueHelper.isValue(fieldLabel)) {
    return fieldLabel
  }

  if (valueHelper.isStringValue(fieldName)) {
    return valueHelper.titleize(valueHelper.humanize(fieldName))
  }

  if (valueHelper.isStringValue(fieldMethod)) {
    return valueHelper.titleize(fieldMethod)
  }

  return ""
}

function labelXs({ labelXs }) {
  if (valueHelper.isValue(labelXs)) {
    return labelXs
  }

  return 2
}

function listField(value) {
  if (!valueHelper.isValue(value)) {
    return ""
  }

  switch (typeof value) {
    case 'boolean':
      return valueHelper.yesNo(value)

    default:
      return valueHelper.makeString(value)
  }
}

function method({ fieldLabel, fieldMethod, fieldName }) {
  if (valueHelper.isValue(fieldMethod)) {
    return fieldMethod
  }

  if (valueHelper.isStringValue(fieldName)) {
    return valueHelper.camelCase(fieldName)
  }

  return valueHelper.camelCase(fieldLabel)
}

function name({ fieldLabel, fieldMethod, fieldName }) {
  if (valueHelper.isValue(fieldName)) {
    return fieldName
  }

  if (valueHelper.isValue(fieldMethod)) {
    return valueHelper.snakeCase(fieldMethod)
  }

  return valueHelper.snakeCase(fieldLabel)
}

function notInContextDisplay(pathKey, name, value, description) {
  if (contextHelper.inContext(pathKey)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, value, description)
}

function optionDisplay(name, options, value, description) {
  return fieldHelper.display(name, options[valueHelper.makeString(value)], description)
}

function options(props) {
  const selectName = fieldHelper.name(props).replace("_", "-")
  const { fieldOptions } = props

  if (Array.isArray(fieldOptions)) {
    return arrayOptions(fieldOptions)
  }

  return hashOptions(fieldOptions)

  function arrayOptions(fieldOptions) {
    return fieldOptions.map(
      (fieldOption) => {
        let id
        let value
        if (typeof fieldOption === 'string') {
          id = fieldOption
          value = fieldOption
        } else {
          id = fieldOption["id"]
          value = fieldOption["value"]
        }

        return (
          <option key={`${selectName}-${id}`} id={id}>
            {value}
          </option>
        )
      }
    )
  }

  function hashOptions(fieldOptions) {
    return Object.keys(fieldOptions).map(
      (id) => {
        const value = fieldOptions[id]

        return (
          <option key={`${selectName}-${id}`} id={id}>
            {value}
          </option>
        )
      }
    )
  }
}

function titleDisplay(name, value, description) {
  return fieldHelper.display(name, valueHelper.titleize(value), description)
}
