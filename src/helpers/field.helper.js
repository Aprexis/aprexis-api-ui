import React from 'react'
import { valueHelper } from './'

export const fieldHelper = {
  booleanDisplay,
  display,
  displayOptional,
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

function optionDisplay(name, options, value) {
  return fieldHelper.display(name, options[valueHelper.makeString(value)])
}

function titleDisplay(name, value) {
  return fieldHelper.display(name, valueHelper.titleize(value))
}
