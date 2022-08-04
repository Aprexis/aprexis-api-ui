import { valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, jsEventHelper, userCredentialsHelper, pathHelper } from "../../helpers"

class AbstractViewModel {
  constructor(props) {
    if (new.target === AbstractViewModel) {
      throw new TypeError("Cannot directly instantiate AbstractViewModel instance; create a subclass instead")
    }

    this.props = props
    this.data = {}

    this.addData = this.addData.bind(this)
    this.addField = this.addField.bind(this)
    this.clearData = this.clearData.bind(this)
    this.clearModal = this.clearModal.bind(this)
    this.create = this.create.bind(this)
    this.destroy = this.destroy.bind(this)
    this.onError = this.onError.bind(this)
    this.orderedPathEntries = this.orderedPathEntries.bind(this)
    this.pathEntries = this.pathEntries.bind(this)
    this.propertiesChanged = this.propertiesChanged.bind(this)
    this.redrawView = this.redrawView.bind(this)
    this.removeField = this.removeField.bind(this)
    this.setFieldFromEvent = this.setFieldFromEvent.bind(this)
    this.update = this.update.bind(this)
  }

  addData(data, nextOperation) {
    this.data = valueHelper.copyHash(data, this.data)

    if (valueHelper.isFunction(nextOperation)) {
      nextOperation()
    }
  }

  addField(fieldName, fieldValue, nextOperation) {
    this.data[fieldName] = valueHelper.copyForHash(fieldValue)

    if (valueHelper.isFunction(nextOperation)) {
      nextOperation()
    }
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
    this.removeField("modal")

    if (valueHelper.isFunction(nextOperation)) {
      nextOperation()
    }
  }

  create(changedModel, nextOperation) {
    this.api().create(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.getAdmin()),
      changedModel,
      nextOperation,
      this.onError
    )
  }

  destroy(model, nextOperation) {
    this.api().destroy(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.getAdmin()),
      this.helper().id(model),
      nextOperation,
      this.onError
    )
  }

  onError(message) {
    this.props.error(message, this.redrawView)
  }

  orderedPathEntries() {
    return pathHelper.orderedPathEntries(this.pathEntries())
  }

  pathEntries() {
    return pathHelper.parsePathEntries(window.location)
  }

  propertiesChanged(nextProps, propertyKeys) {
    if (valueHelper.isValue(this.props) != valueHelper.isValue(nextProps)) {
      return true
    }
    if (!valueHelper.isValue(this.props)) {
      return false
    }

    return valueHelper.isValue(
      propertyKeys.find(
        (propertyKey) => {
          const currentValue = this.props[propertyKey]
          const nextValue = nextProps[propertyKey]

          if (!valueHelper.isValue(currentValue)) {
            return valueHelper.isValue(nextValue)
          }

          if (!valueHelper.isValue(nextValue)) {
            return false
          }

          return compareValues(propertyKey, currentValue, nextValue)
        }
      )
    )

    function compareArrays(propertyKey, currentArray, nextArray) {
      if (!Array.isArray(nextArray)) {
        return true
      }
      if (nextArray.length !== currentArray.length) {
        return true
      }
      if (currentArray.length === 0) {
        return false
      }

      return valueHelper.isValue(
        currentArray.find(
          (currentValue, idx) => {
            const nextValue = nextArray[idx]
            return compareValues(`${propertyKey}[${idx}]`, currentValue, nextValue)
          }
        )
      )
    }

    function compareObjects(_propertyKey, currentObject, nextObject) {
      if (valueHelper.isFunction(currentObject.getFullYear)) {
        return +currentObject != +nextObject
      }

      return false
    }

    function compareValues(propertyKey, currentValue, nextValue) {
      if (Array.isArray(currentValue)) {
        return compareArrays(propertyKey, currentValue, nextValue)
      }

      if (typeof currentValue === 'object') {
        return compareObjects(propertyKey, currentValue, nextValue)
      }

      return currentValue != nextValue
    }
  }

  redrawView(nextOperation) {
    let keepKeys = []
    if (valueHelper.isFunction(this.keysToKeep)) {
      keepKeys = this.keysToKeep()
    }

    this.props.view.setState(
      (oldState, _oldProps) => {
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

    if (valueHelper.isFunction(nextOperation)) {
      nextOperation()
    }
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

    this.addField(name, value, this.redrawView)
  }

  update(changedModel, nextOperation) {
    this.api().update(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.getAdmin()),
      changedModel,
      nextOperation,
      this.onError
    )
  }
}

export { AbstractViewModel }
