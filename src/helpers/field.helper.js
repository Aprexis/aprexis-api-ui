import React from 'react'
import { valueHelper } from './'

export const fieldHelper = {
  booleanDisplay,
  display,
  displayOptional,
  imageDisplay,
  optionDisplay,
  titleDisplay
}

function booleanDisplay(name, value) {
  return fieldHelper.display(name, valueHelper.yesNo(value))
}

function display(name, value) {
  return (
    <React.Fragment><strong className="text-muted">{name}:</strong> {value}<br /></React.Fragment>
  )
}

function displayOptional(name, value) {
  if (!valueHelper.isStringValue(value)) {
    return (<React.Fragment />)
  }

  return fieldHelper.display(name, value)
}

function imageDisplay(name, value) {
  return fieldHelper.display(name, <img src={`data:image/jpeg;base64,${value}`} alt="logo" />)
}

function optionDisplay(name, options, value) {
  return fieldHelper.display(name, options[valueHelper.makeString(value)])
}

function titleDisplay(name, value) {
  return fieldHelper.display(name, valueHelper.titleize(value))
}
