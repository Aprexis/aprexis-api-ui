export const devExtremeHelper = {
  dateItem,
  dateRangeGroup,
  dateTimeItem,
  dateTimeRangeGroup,
  emptyItem,
  selectIdItem,
  selectItem,
  selectSimpleItem,
  switchItem,
  textItem
}

function dateItem(dateField, options = { colSpan: 2 }) {
  return {
    colSpan: options.colSpan,
    dataField: dateField.dataField,
    editorType: "dxDateBox",
    label: {
      text: dateField.label,
    },
    validationRules: [
      {
        type: "required"
      }
    ],
    editorOptions: {
      calendarOptions: {},
      type: "date",
      width: "100%"
    }
  }
}


function dateRangeGroup(startDateField, stopDateField, options = { colSpan: 2 }) {
  return {
    colCountByScreen: {
      lg: 2,
      xs: 1
    },
    colSpan: options.colSpan,
    items: [
      devExtremeHelper.dateItem(startDateField, { colSpan: 1 }),
      devExtremeHelper.dateItem(stopDateField, { colSpan: 1 })
    ],
    itemType: "group"
  }
}

function dateTimeItem(dateField, options = { colSpan: 2 }) {
  return {
    colSpan: options.colSpan,
    dataField: dateField.dataField,
    editorType: "dxDateBox",
    label: {
      text: dateField.label,
    },
    validationRules: [
      {
        type: "required"
      }
    ],
    editorOptions: {
      calendarOptions: {},
      type: "datetime",
      width: "100%"
    }
  }
}

function dateTimeRangeGroup(startDateField, stopDateField, options = { colSpan: 2 }) {
  return {
    colCountByScreen: {
      lg: 2,
      xs: 1
    },
    colSpan: options.colSpan,
    items: [
      devExtremeHelper.dateTimeItem(startDateField, { colSpan: 1 }),
      devExtremeHelper.dateTimeItem(stopDateField, { colSpan: 1 })
    ],
    itemType: "group"
  }
}

function emptyItem(options = { colSpan: 2 }) {
  return {
    colSpan: options.colSpan,
    itemType: "empty"
  }
}

function selectIdItem(selectField, options = { colSpan: 2 }) {
  const items = selectField.options.map(
    (option) => {
      return {
        id: selectField.helper.id(option),
        identification: selectField.helper[selectField.identificationMethod](option)
      }
    }
  )

  return {
    colSpan: options.colSpan,
    dataField: selectField.dataField,
    editorOptions: {
      displayExpr: "identification",
      items,
      valueExpr: "id"
    },
    editorType: "dxSelectBox",
    label: {
      text: selectField.label
    }
  }
}

function selectItem(selectField, options = { colSpan: 2 }) {
  return {
    colSpan: options.colSpan,
    dataField: selectField.dataField,
    editorOptions: {
      displayExpr: "display",
      items: selectField.options,
      valueExpr: "value"
    },
    editorType: "dxSelectBox",
    label: {
      text: selectField.label
    }
  }
}

function selectSimpleItem(selectField, options = { colSpan: 2 }) {
  const items = selectField.options.map(
    (option) => {
      return {
        display: option,
        value: option
      }
    }
  )

  return {
    colSpan: options.colSpan,
    dataField: selectField.dataField,
    editorOptions: {
      displayExpr: "display",
      items,
      valueExpr: "value"
    },
    editorType: "dxSelectBox",
    label: {
      text: selectField.label
    }
  }
}

function switchItem(switchField, options = { colSpan: 2 }) {
  return {
    colSpan: options.colSpan,
    cssClass: "dx-appointment-form-switch",
    dataField: switchField.dataField,
    editorOptions: {},
    editorType: "dxSwitch",
    label: {
      text: switchField.label,
      location: "right"
    }
  }
}

function textItem(textField, options = { colSpan: 2 }) {
  return {
    colSpan: options.colSpan,
    dataField: textField.dataField,
    editorType: "dxTextBox",
    label: {
      text: textField.label
    }
  }
}
