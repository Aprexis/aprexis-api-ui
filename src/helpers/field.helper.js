import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { contextHelper, dateHelper, valueHelper } from './'

export const fieldHelper = {
  booleanDisplay,
  dateDisplay,
  dateTimeDisplay,
  display,
  displayWithUnits,
  dollarDisplay,
  getField,
  imageDisplay,
  notInContextDisplay,
  optionDisplay,
  titleDisplay
}

function booleanDisplay(name, value, description) {
  return fieldHelper.display(name, valueHelper.yesNo(value), description, "?")
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
  if (typeof value === 'string' && !valueHelper.isStringValue(value)) {
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
      <FontAwesomeIcon className='ml-1' icon={faInfoCircle} id={targetId} />
      <UncontrolledTooltip placement="top" boundariesElement="window" target={targetId}>
        {description}
      </UncontrolledTooltip>
      <br />
    </span>
  )
}

function displayWithUnits(name, value, units, description) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === 'string' && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, `${value} ${units}`, description)
}

function dollarDisplay(name, value, description) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === 'string' && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, `$${value}`, description)
}

function getField(object, fieldName, prefix) {
  if (!valueHelper.isValue(object)) {
    return
  }

  if (!valueHelper.isStringValue(prefix)) {
    return object[fieldName]
  }

  return object[`${prefix}_${fieldName}`]
}

function imageDisplay(name, value, description) {
  if (valueHelper.isStringValue(value)) {
    return fieldHelper.display(name, <img src={`data:image/jpeg;base64,${value}`} alt="logo" />, description)
  }

  return fieldHelper.display(name, "")
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

function titleDisplay(name, value, description) {
  return fieldHelper.display(name, valueHelper.titleize(value), description)
}
