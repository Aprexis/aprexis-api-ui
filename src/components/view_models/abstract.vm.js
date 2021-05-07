import { alertHelper, jsEventHelper, pathHelper, valueHelper } from "../../helpers"

class AbstractViewModel {
  constructor(props) {
    if (new.target === AbstractViewModel) {
      throw new TypeError('Cannot directly instantiate AbstractViewModel instance; create a subclass instead')
    }

    this.props = props
    this.data = {}

    this.addData = this.addData.bind(this)
    this.addField = this.addField.bind(this)
    this.clearAlert = this.clearAlert.bind(this)
    this.clearData = this.clearData.bind(this)
    this.clearModal = this.clearModal.bind(this)
    this.onError = this.onError.bind(this)
    this.orderedPathEntries = this.orderedPathEntries.bind(this)
    this.pathEntries = this.pathEntries.bind(this)
    this.redrawView = this.redrawView.bind(this)
    this.removeField = this.removeField.bind(this)
    this.setFieldFromEvent = this.setFieldFromEvent.bind(this)
  }

  addData(data, nextOperation) {
    this.data = { ...this.data, ...data }

    if (!valueHelper.isFunction(nextOperation)) {
      this.redrawView()
      return
    }

    nextOperation()
  }

  addField(fieldName, fieldValue, nextOperation) {
    this.data[fieldName] = fieldValue

    if (!valueHelper.isFunction(nextOperation)) {
      this.redrawView()
      return
    }

    nextOperation()
  }

  clearAlert() {
    alertHelper.clear()
    this.redrawView()
  }

  clearData(redraw = true, fieldsToKeep = []) {
    if (fieldsToKeep.length === 0) {
      this.data = {}
    } else {
      Object.keys(this.data).filter((key) => !fieldsToKeep.includes(key)).forEach((key) => { delete this.data[key] })
    }

    if (valueHelper.isSet(redraw)) {
      this.redrawView()
    }
  }

  clearModal(nextOperation) {
    this.removeField('modal')

    if (valueHelper.isFunction(nextOperation)) {
      nextOperation()
    }
  }

  onError(message) {
    alertHelper.error(message)
    let { errorCount } = this.data
    if (valueHelper.isValue(errorCount)) {
      errorCount = errorCount + 1
    } else {
      errorCount = 1
    }
    this.addField("errorCount", errorCount)
    this.redrawView()
  }

  orderedPathEntries() {
    return pathHelper.orderedPathEntries(this.pathEntries())
  }

  pathEntries() {
    return pathHelper.parsePathEntries(window.location)
  }

  redrawView() {
    let keepKeys = []
    if (valueHelper.isFunction(this.keysToKeep)) {
      keepKeys = this.keysToKeep()
    }

    this.props.view.setState(
      (oldState, oldProps) => {
        const stateReset = Object.keys(oldState)
          .filter((key) => !keepKeys.includes(key))
          .reduce((acc, v) => ({ ...acc, [v]: undefined }), {})
        return {
          ...stateReset,
          redraw: true,
          ...this.data
        }
      }
    )
  }

  removeField(fieldName, nextOperation) {
    delete this.data[fieldName]

    if (!valueHelper.isFunction(nextOperation)) {
      this.redrawView()
      return
    }

    nextOperation()
  }

  setFieldFromEvent(event) {
    const { name, value } = jsEventHelper.fromInputEvent(event)

    this.addField(name, value)
  }
}

export { AbstractViewModel }
