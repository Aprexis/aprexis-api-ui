import React from "react"
import { UncontrolledTooltip } from "reactstrap"
import { faCalendarMinus, faLock, faUserSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { valueHelper, dateHelper, fieldHelper, userHelper, billingClaimHelper } from "@aprexis/aprexis-api-utility"
import { contextHelper } from "./context.helper"
import { jsEventHelper } from "./js_event.helper"

export const displayHelper = {
  booleanDisplay,
  changeField,
  dateDisplay,
  dateTimeDisplay,
  display,
  displayBillingStatus,
  displayClaimReferenceNumbers,
  displayListField,
  displayWithUnits,
  dollarDisplay,
  fieldXs,
  imageDisplay,
  includeField,
  label,
  labelXs,
  listField,
  notInContextDisplay,
  options,
  optionDisplay,
  phoneDisplay,
  phoneNumberForDisplay,
  renderAccess,
  titleDisplay
}

function booleanDisplay(name, value, description, required = false) {
  return displayHelper.display(name, valueHelper.yesNo(value), description, "?", required)
}

function changeField(modelName, model, changedModel, event) {
  const { name, value } = jsEventHelper.fromInputEvent(event)

  return fieldHelper.changeValue(modelName, model, changedModel, name, value)
}


function dateDisplay(name, value, description) {
  return displayHelper.display(name, dateHelper.displayDate(value), description)
}

function dateTimeDisplay(name, value, description) {
  return displayHelper.display(name, dateHelper.displayDateTime(value), description)
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

function displayBillingStatus(billingClaim, showToolTip = false) {
  const billingStatus = billingClaimHelper.billingStatus(billingClaim)
  if (!showToolTip) {
    return billingStatus
  }

  const statusDescription = billingClaimHelper.statusDescription(billingClaim)
  if (!valueHelper.isStringValue(statusDescription)) {
    return billingStatus
  }

  return (
    <React.Fragment>
      <span id="billing-status">{billingStatus}</span>
      <UncontrolledTooltip placement="top" boundariesElement="window" target="billing-status">
        {statusDescription}
      </UncontrolledTooltip>
    </React.Fragment>
  )
}

function displayClaimReferenceNumbers(billingClaim) {
  const pharmacyNumber = displayPharmacyReferenceNumber(billingClaim)
  const aprexisNumber = displayAprexisReferenceNumber(billingClaim)
  const payerNumber = displayPayerClaimTrackingNumber(billingClaim)

  return (
    <React.Fragment>
      <label>{pharmacyNumber}</label><br />
      <label>{aprexisNumber}</label><br />
      <label>{payerNumber}</label>
    </React.Fragment>
  )

  function displayAprexisReferenceNumber(billingClaim) {
    const referenceNumber = billingClaimHelper.referenceNumber(billingClaim)
    if (!valueHelper.isStringValue(referenceNumber)) {
      return "Not available"
    }

    const dash = referenceNumber.lastIndexOf("-")
    if (dash === -1) {
      return referenceNumber
    }

    return referenceNumber.substring(dash + 1)
  }

  function displayPayerClaimTrackingNumber(billingClaim) {
    const payerNumber = billingClaimHelper.payerClaimTrackingNumber(billingClaim)
    if (!valueHelper.isStringValue(payerNumber)) {
      return "Not available"
    }

    return payerNumber
  }

  function displayPharmacyReferenceNumber(billingClaim) {
    const referenceNumber = billingClaimHelper.referenceNumber(billingClaim)
    if (!valueHelper.isStringValue(referenceNumber)) {
      return "Not available"
    }

    const dash = referenceNumber.lastIndexOf("-")
    if (dash === -1) {
      return 'Not available'
    }

    return referenceNumber.substring(0, dash - 1)
  }
}


function displayListField(model, helper, heading) {
  const value = fieldMethod(helper, heading)(model)
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

  function fieldMethod(helper, heading) {
    if (valueHelper.isFunction(heading.method)) {
      return heading.method
    }

    const methodName = valueHelper.isStringValue(heading.method) ? heading.method : heading.field
    return helper[methodName]
  }
}

function displayWithUnits(name, value, units, description, suffix = ":", required = false) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === "string" && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return displayHelper.display(name, `${value} ${units}`, description, suffix, required)
}

function dollarDisplay(name, value, description, suffix = ":", required = false) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === "string" && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return displayHelper.display(name, `$${value}`, description, suffix, required)
}

function phoneDisplay(name, value, description, extension, suffix = ":", required = false) {
  const phoneNumber = displayHelper.phoneNumberForDisplay(value, extension)
  if (!valueHelper.isStringValue(phoneNumber)) {
    return (<React.Fragment />)
  }

  return displayHelper.display(name, phoneNumber, description, suffix, required)
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

function fieldXs(props) {
  const { fieldXs } = props
  if (valueHelper.isValue(fieldXs)) {
    return fieldXs
  }

  const { fieldXsTotal } = props
  if (!valueHelper.isValue(fieldXsTotal)) {
    return 10
  }

  return fieldXsTotal - displayHelper.labelXs(props)
}

function imageDisplay(name, value, description) {
  if (valueHelper.isStringValue(value)) {
    return displayHelper.display(name, <img src={`data: image / jpeg; base64, ${value} `} alt="logo" />, description)
  }

  return displayHelper.display(name, "")
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

    return includeCheckFilters(filters, displayHelper["ifFilters"])
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

function notInContextDisplay(pathKey, name, value, description) {
  if (contextHelper.inContext(pathKey)) {
    return (<React.Fragment />)
  }

  return displayHelper.display(name, value, description)
}

function optionDisplay(name, options, value, description, suffix = ":", required = false) {
  return displayHelper.display(name, options[valueHelper.makeString(value)], description, suffix, required)
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
          <option key={`${selectName}-${value}`} value={value}>
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

function renderAccess(user) {
  if (!valueHelper.isValue(user)) {
    return
  }

  const accessLocked = renderAccessLocked(user)
  const allowLogin = renderAllowLogin(user)
  const expired = renderExpired(user)

  return (<React.Fragment>{expired}{accessLocked}{allowLogin}</React.Fragment>)

  function renderAccessLocked(user) {
    if (!userHelper.isAccessLocked(user)) {
      return
    }

    return (
      <span>
        &nbsp;
        <FontAwesomeIcon className="ml-1 red" icon={faLock} id={`access-locked-${user.id}`} />
        <UncontrolledTooltip placement="top" boundariesElement="window" target={`access-locked-${user.id}`}>
          Account is temporarily locked
        </UncontrolledTooltip>
      </span>
    )
  }

  function renderAllowLogin(user) {
    if (userHelper.isLoginAllowed(user)) {
      return
    }

    return (
      <span>
        &nbsp;
        <FontAwesomeIcon className="ml-1 red" icon={faUserSlash} id={`disallow-login-${user.id}`} />
        <UncontrolledTooltip placement="top" boundariesElement="window" target={`disallow-login-${user.id}`}>
          Login not allowed
        </UncontrolledTooltip>
      </span>
    )
  }

  function renderExpired(user) {
    if (!userHelper.isExpired(user)) {
      return
    }

    return (
      <span>
        &nbsp;
        <FontAwesomeIcon className="ml-1 red" icon={faCalendarMinus} id={`disallow-login-${user.id}`} />
        <UncontrolledTooltip placement="top" boundariesElement="window" target={`disallow-login-${user.id}`}>
          Account has expired
        </UncontrolledTooltip>
      </span>
    )
  }
}

function titleDisplay(name, value, description, suffix = ":", required = false) {
  return displayHelper.display(name, valueHelper.titleize(value), description, suffix, required)
}
