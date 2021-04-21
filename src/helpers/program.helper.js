import { valueHelper } from "./value.helper"

export const programHelper = {
  name,
  toBreadcrumb,
  type
}

function name(program) {
  return valueHelper.getField(program, "name")
}

function toBreadcrumb(program) {
  if (!valueHelper.isValue(program)) {
    return "(no program)"
  }

  return `${programHelper.getType(program)} ${programHelper.getName(program)}`
}

function type(program) {
  return valueHelper.getField(program, "type")
}
