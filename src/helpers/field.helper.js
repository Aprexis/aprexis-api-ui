import React from "react"
import { UncontrolledTooltip } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { valueHelper } from "./value.helper"
import { dateHelper } from "./date.helper"
import { contextHelper } from "./context.helper"
import { jsEventHelper } from "./js_event.helper"
import { alertHelper } from "./alert.helper"


export const fieldHelper = {
  addEntry,
  booleanDisplay,
  changeDate,
  changeDateTime,
  changeField,
  changeTime,
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
  phoneDisplay,
  phoneNumberForDisplay,
  removeEntry,
  titleDisplay,
  unchanged
}

function addEntryToList(model, field, newEntry) {
  const entries = model[field]
  if (!valueHelper.isValue(entries)) {
    return [newEntry]
  }

  return [...entries, newEntry]
}

function addEntry(modelName, model, changedModel, field, matchField, newEntry) {
  const entries = model[field]
  const changedEntries = changedModel[field]
  if (valueHelper.isValue(entries)) {
    const existingEntry = entries.find((entry) => entry[matchField] == newEntry[matchField])
    if (valueHelper.isValue(existingEntry)) {
      return unchanged(modelName, model, changedModel, `${field} already has an entry`)
    }
  }

  if (valueHelper.isValue(changedEntries)) {
    const existingChangedEntry = changedEntries.find((changedEntry) => changedEntry[matchField] == newEntry[matchField])
    if (valueHelper.isValue(existingChangedEntry)) {
      return restoreOldEntry(modelName, model, changedModel, field, existingChangedEntry)
    }
  }

  return addNewEntry(modelName, model, changedModel, field, newEntry)

  function addNewEntry(modelName, model, changedModel, field, newEntry) {
    return {
      [modelName]: { ...model, [field]: addEntryToList(model, field, newEntry) },
      [valueHelper.changedModelName(modelName)]: { ...changedModel, [field]: addEntryToList(changedModel, field, newEntry) }
    }
  }

  function restoreOldEntry(modelName, model, changedModel, field, oldEntry) {
    const restoredEntry = [...oldEntry]
    delete restoredEntry['_destroy']
    const newChangedEntries = changedModel[field].filter((changedEntry) => changedEntry != oldEntry)

    return {
      [modelName]: { ...model, [field]: addEntryToList(model, field, restoredEntry) },
      [valueHelper.changedModelName(modelName)]: { ...changedModel, newChangedEntries }
    }
  }
}

function booleanDisplay(name, value, description, required = false) {
  return fieldHelper.display(name, valueHelper.yesNo(value), description, "?", required)
}

function changeDate(modelName, model, changedModel, fieldName, date, dateValid) {
  const nameValid = `${fieldName}_DVALID`
  const updatedValid = { ...model[nameValid], ...dateValid }
  return fieldHelper.changeValues(
    modelName,
    model,
    changedModel,
    { [fieldName]: date, [nameValid]: updatedValid }
  )
}

function changeDateTime(modelName, model, changedModel, fieldName, dateTime, dateTimeValid) {
  const nameValid = `${fieldName}_DTVALID`
  const updatedValid = { ...model[nameValid], ...dateTimeValid }
  return fieldHelper.changeValues(
    modelName,
    model,
    changedModel,
    { [fieldName]: dateTime, [nameValid]: updatedValid }
  )
}

function changeField(modelName, model, changedModel, event) {
  const { name, value } = jsEventHelper.fromInputEvent(event)

  return fieldHelper.changeValue(modelName, model, changedModel, name, value)
}

function changeTime(modelName, model, changedModel, fieldName, time, timeValid) {
  const nameValid = `${fieldName}_TVALID`
  const updatedValid = { ...model[timeValid], ...timeValid }

  return fieldHelper.changeValues(
    modelName,
    model,
    changedModel,
    { [fieldName]: time, [nameValid]: updatedValid }
  )
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

function display(name, value, description, suffix = ":", required = false) {
  if (!required) {
    if (!valueHelper.isValue(value)) {
      return (<React.Fragment />)
    }
    if (typeof value === "string" && !valueHelper.isStringValue(value)) {
      return (<React.Fragment />)
    }
  }

  let workingValue = value
  if (!valueHelper.isValue(value)) {
    workingValue = ""
  }

  if (!valueHelper.isValue(description) ||
    (typeof description === "string" && !valueHelper.isStringValue(description))) {
    return (
      <React.Fragment><strong className="text-muted">{name}{suffix}</strong> {value}<br /></React.Fragment>
    )
  }

  const targetId = `description-${name.toLowerCase().replaceAll(" ", "-")}`
  return (
    <span>
      <strong className="text-muted">{name}{suffix}</strong> {workingValue}&nbsp;
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

function displayWithUnits(name, value, units, description, suffix = ":", required = false) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === "string" && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, `${value} ${units}`, description, suffix, required)
}

function dollarDisplay(name, value, description, suffix = ":", required = false) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === "string" && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, `$${value}`, description, suffix, required)
}

function phoneDisplay(name, value, description, extension, suffix = ":", required = false) {
  const phoneNumber = fieldHelper.phoneNumberForDisplay(value, extension)
  if (!valueHelper.isStringValue(phoneNumber)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, phoneNumber, description, suffix, required)
}

function phoneNumberForDisplay(number, extension) {
  let phoneNumber = formatPhoneNumber(number)
  if (valueHelper.isStringValue(extension)) {
    const phoneExtension = `Ext. ${extension}`
    phoneNumber = valueHelper.isStringValue(phoneNumber) ? `${phoneNumber} ${phoneExtension}` : phoneExtension
  }

  return phoneNumber

  function formatPhoneNumber(number) {
    if (!valueHelper.isStringValue(number)) {
      return
    }

    if (number.startsWith('+')) {
      return number
    }

    const value = number.replaceAll(/-|\(|\)|\s/g, "")
    if (![7, 10, 11].includes(value.length)) {
      return number
    }

    let phoneNumber = ""
    let used = 0
    if (value.length == 11) {
      phoneNumber = "1-"
      used = 1
    }
    if (value.length >= 10) {
      phoneNumber = `${phoneNumber}(${value.substring(used, used + 3)})`
      used += 3
    }

    phoneNumber = `${phoneNumber} ${value.substring(used, used + 3)}-${value.substring(used + 3)}`
    return phoneNumber
  }
}

function fieldName(fieldName, prefix) {
  if (!valueHelper.isStringValue(prefix)) {
    return fieldName
  }

  return `${prefix}_${fieldName} `
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
    return fieldHelper.display(name, <img src={`data: image / jpeg; base64, ${value} `} alt="logo" />, description)
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

function label({ fieldLabel, fieldMethod, fieldName, required }) {
  return (
    <React.Fragment>
      {labelValue(fieldLabel, fieldMethod, fieldName)}{labelRequired(required)}
    </React.Fragment>
  )

  function labelValue(fieldLabel, fieldMethod, fieldName) {
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

  function labelRequired(required) {
    if (!valueHelper.isSet(required)) {
      return
    }

    return (<span style={{ color: "red" }}>&nbsp;*</span>)
  }
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

function optionDisplay(name, options, value, description, suffix = ":", required = false) {
  return fieldHelper.display(name, options[valueHelper.makeString(value)], description, suffix, required)
}

function options(props) {
  const selectName = fieldHelper.name(props).replace(/_/g, "-")
  const { fieldOptions } = props

  if (Array.isArray(fieldOptions)) {
    return arrayOptions(fieldOptions)
  }

  return hashOptions(fieldOptions)

  function arrayOptions(fieldOptions) {
    return fieldOptions.map(
      (fieldOption) => {
        const { value, label } = optionValues(fieldOption)

        return (
          <option key={`${selectName} -${value} `} value={value}>
            {label}
          </option>
        )
      }
    )

    function optionValues(fieldOption) {
      if (typeof fieldOption === 'string') {
        return {
          value: fieldOption,
          label: fieldOption
        }
      }

      return fieldOption
    }
  }

  function hashOptions(fieldOptions) {
    return Object.keys(fieldOptions).map(
      (fieldOptionKey) => {
        const fieldOptionValue = fieldOptions[fieldOptionKey]

        return (
          <option key={`${selectName} -${fieldOptionKey} `} value={fieldOptionKey}>
            {fieldOptionValue}
          </option>
        )
      }
    )
  }
}

function removeEntry(modelName, model, changedModel, field, matchField, oldEntry) {
  if (valueHelper.isNumberValue(oldEntry.id)) {
    return destroyExistingEntry(modelName, model, changedModel, field, matchField, oldEntry)
  }

  return removeAddedEntry(modelName, model, changedModel, field, matchField, oldEntry)

  function destroyExistingEntry(modelName, model, changedModel, field, matchField, oldEntry) {
    const entries = model[field]
    if (!valueHelper.isValue(entries)) {
      return fieldHelper.unchanged(modelName, model, changedModel, `${field} does not have entries to remove`)
    }

    const newEntries = entries.filter((entry) => entry[matchField] != oldEntry[matchField])
    const destroyEntry = { ...oldEntry, "_destroy": true }
    const newChangedEntries = addEntryToList(changedModel, field, destroyEntry)
    return {
      [modelName]: { ...model, [field]: newEntries },
      [valueHelper.changedModelName(modelName)]: { ...changedModel, [field]: newChangedEntries }
    }
  }

  function removeAddedEntry(modelName, model, changedModel, field, matchField, addedEntry) {
    const entries = model[field]
    if (!valueHelper.isValue(entries)) {
      return fieldHelper.unchanged(modelName, model, changedModel, `${field} does not have entries to remove`)
    }

    const changedEntries = changedModel[field]
    if (!valueHelper.isValue(changedEntries)) {
      return fieldHelper.unchanged(modelName, model, changedModel, `${field} does not contain an added entry to remove`)
    }

    const newEntries = entries.filter((entry) => entry[matchField] != oldEntry[matchField])
    const newChangedEntries = changedEntries.filter((changedEntry) => changedEntry[matchField] == oldEntry[matchField])
    return {
      [modelName]: { ...model, [field]: newEntries },
      [valueHelper.changedModelName(modelName)]: { ...changedModel, [field]: newChangedEntries }
    }
  }
}

function titleDisplay(name, value, description, suffix = ":", required = false) {
  return fieldHelper.display(name, valueHelper.titleize(value), description, suffix, required)
}

function unchanged(modelName, model, changedModel, warning) {
  if (valueHelper.isStringValue(warning)) {
    alertHelper.warning(warning)
  }

  return {
    [modelName]: model,
    [valueHelper.changedModelName(modelName)]: changedModel
  }
}
