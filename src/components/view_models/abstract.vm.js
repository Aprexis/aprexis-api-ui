import { jsEventHelper, valueHelper } from "../../helpers"

class AbstractViewModel {
  constructor(props) {
    if (new.target === AbstractViewModel) {
      throw new TypeError('Cannot directly instantiate AbstractViewModel instance; create a subclass instead')
    }

    this.props = props
    this.data = {}

    this.addData = this.addData.bind(this)
    this.addField = this.addField.bind(this)
    this.clearData = this.clearData.bind(this)
    this.redrawView = this.redrawView.bind(this)
    this.setFieldFromEvent = this.setFieldFromEvent.bind(this)
  }

  addData(data) {
    this.data = { ...this.data, ...data }
    this.redrawView()
  }

  addField(fieldName, fieldValue) {
    this.data[fieldName] = fieldValue
    this.redrawView()
  }

  clearData(redraw = true) {
    this.data = {}

    if (valueHelper.isSet(redraw)) {
      this.redrawView()
    }
  }

  redrawView() {
    const { view } = this.props
    let keepKeys = []
    if (valueHelper.isFunction(this.keysToKeep)) {
      keepKeys = this.keysToKeep()
    }

    view.setState(
      (oldState, oldProps) => {
        const stateReset = Object.keys(oldState).filter((key) => !keepKeys.includes(key)).reduce((acc, v) => ({ ...acc, [v]: undefined }), {})
        return {
          ...stateReset,
          redraw: true,
          ...this.data
        }
      }
    )
  }

  setFieldFromEvent(event) {
    const { name, value } = jsEventHelper.fromInputEvent(event)

    this.addField(name, value)
  }
}

export { AbstractViewModel }
