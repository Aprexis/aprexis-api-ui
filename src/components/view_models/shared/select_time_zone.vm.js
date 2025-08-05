import { AbstractViewModel } from "../abstract.vm.js"
import { timeZones, valueHelper } from "@aprexis/aprexis-api-utility"
import { jsEventHelper } from "../../../helpers/index.js"

class SelectTimeZoneViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.changeTimeZone = this.changeTimeZone.bind(this)
    this.required = this.required.bind(this)
  }

  changeTimeZone(event) {
    const { name, value } = jsEventHelper.fromInputEvent(event)
    const { changeFieldValue } = this.props

    changeFieldValue(name, timeZones[value])
  }

  required() {
    const { fieldName, isRequired } = this.props

    if (valueHelper.isFunction(isRequired)) {
      return isRequired(fieldName)
    }

    return false
  }
}

export { SelectTimeZoneViewModel }
