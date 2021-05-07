export const filterTypes = {
  "boolean": {
    onChange: "onChange",
    optional: ["disabled", "falseLabel", "trueLabel", "unselectedLabel"]
  },
  "date-time-range": {
    onChange: "onChangeDateTime",
    optional: [
      "disabled",
      "disabledDays",
      "from",
      "label",
      "startFieldLabel",
      "stopFieldLabel",
      "to"
    ]
  },
  "name-id": {
    onChange: "onChange",
    optional: [
      "disabled",
      "fields",
      "findMethod",
      "labelMethod",
      "minLength",
      "otherFilters",
      "searchMethod",
      "searchParam",
      "sorting"
    ]
  },
  "string": {
    onChange: "onChange",
    optional: ["disabled"]
  },
  "select-id": {
    onChange: "onChangeId",
    optional: ["disabled", "multiple", "options", "requireUnselected", "unselectedLabel"]
  }
}
