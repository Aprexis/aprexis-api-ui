import React from 'react'
import { contextHelper, dateHelper, valueHelper } from './'

export const fieldHelper = {
  booleanDisplay,
  dateDisplay,
  dateTimeDisplay,
  display,
  displayWithUnits,
  imageDisplay,
  notInContextDisplay,
  optionDisplay,
  titleDisplay
}

function booleanDisplay(name, value) {
  return fieldHelper.display(name, valueHelper.yesNo(value))
}

function dateDisplay(name, value) {
  return fieldHelper.display(name, dateHelper.displayDate(value))
}

function dateTimeDisplay(name, value) {
  return fieldHelper.display(name, dateHelper.displayDateTime(value))
}

function display(name, value) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === 'string' && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return (
    <React.Fragment><strong className="text-muted">{name}:</strong> {value}<br /></React.Fragment>
  )
}

function displayWithUnits(name, value, units) {
  if (!valueHelper.isValue(value)) {
    return (<React.Fragment />)
  }
  if (typeof value === 'string' && !valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return (
    <React.Fragment><strong className="text-muted">{name}:</strong> {value} {units}<br /></React.Fragment>
  )
}

function imageDisplay(name, value) {
  if (valueHelper.isStringValue(value)) {
    return fieldHelper.display(name, <img src={`data:image/jpeg;base64,${value}`} alt="logo" />)
  }

  return fieldHelper.display(name, "")
}

function notInContextDisplay(pathKey, name, value) {
  if (contextHelper.inContext(pathKey)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, value)
}

function optionDisplay(name, options, value) {
  return fieldHelper.display(name, options[valueHelper.makeString(value)])
}

function titleDisplay(name, value) {
  return fieldHelper.display(name, valueHelper.titleize(value))
}
