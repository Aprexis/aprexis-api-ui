import { valueHelper } from "@aprexis/aprexis-api-utility"

export const jsEventHelper = {
  fromInputEvent
}

function fromInputEvent(event) {
  if (!valueHelper.isValue(event.target)) {
    return {}
  }

  const { name } = event.target
  const value = inputEventValue(event)

  return { name, value }

  function inputEventValue(event) {
    if (valueHelper.isValue(event.target.attributes) &&
      valueHelper.isValue(event.target.attributes.type) &&
      event.target.attributes.type.nodeValue === 'checkbox') {
      return event.target.checked
    }

    return event.target.value
  }
}
