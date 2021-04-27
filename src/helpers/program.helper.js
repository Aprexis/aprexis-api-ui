import { fieldHelper, valueHelper } from "./"

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
  return valueHelper.titleize(fieldHelper.getField(program, "name"))
}

function toBreadcrumb(program) {
  return programHelper.display(program)
}

function type(program) {
  return valueHelper.titleize(fieldHelper.getField(program, "type"))
}
