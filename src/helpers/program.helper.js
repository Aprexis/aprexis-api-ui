import { valueHelper } from "./value.helper"

export const programHelper = {
  display,
  name,
  toBreadcrumb,
  type
}

function display(program) {
  if (!valueHelper.isValue(program)) {
    return "(no program)"
  }

  return `${programHelper.name(program)} (${programHelper.type(program)})`
}

function name(program) {
  return valueHelper.titleize(valueHelper.getField(program, "name"))
}

function toBreadcrumb(program) {
  return programHelper.display(program)
}

function type(program) {
  return valueHelper.titleize(valueHelper.getField(program, "type"))
}
