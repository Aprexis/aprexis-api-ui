import React from "react"
import { AbstractViewModel } from "../"
import { alertHelper, dateHelper, fieldHelper, userCredentialsHelper, valueHelper } from "../../../helpers"

function initializeDateAndTimeValidity(dateAndTimeField, value) {
  const validDate = dateHelper.isValidDate(value)

  switch (dateAndTimeField.type) {
    case "date":
      return { validDate }

    case "date/time":
      return { validDate, validTime: validDate }

    default:
      return
  }
}

function nameForDateAndTimeValidity(fieldName, dateAndTimeField) {
  switch (dateAndTimeField.type) {
    case "date":
      return `${fieldName}_DVALID`

    case "date/time":
      return `${fieldName}_DTVALID`

    default:
      return
  }
}

class AbstractModalViewModel extends AbstractViewModel {
  constructor(props) {
    if (new.target === AbstractModalViewModel) {
      throw new TypeError("Cannot directly instantiate AbstractModalViewModel instance; create a subclass instead")
    }

    super(props)

    this.checkRequiredFields = this.checkRequiredFields.bind(this)
    this.checkValidDatesAndTimes = this.checkValidDatesAndTimes.bind(this)
    this.changeDate = this.changeDate.bind(this)
    this.changeDateTime = this.changeDateTime.bind(this)
    this.changeField = this.changeField.bind(this)
    this.changeNumericField = this.changeNumericField.bind(this)
    this.create = this.create.bind(this)
    this.initializeDateAndTimeValidities = this.initializeDateAndTimeValidities.bind(this)
    this.renderSubmitFooter = this.renderSubmitFooter.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.submitModalCreateOrUpdate = this.submitModalCreateOrUpdate.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.update = this.update.bind(this)
  }

  checkRequiredFields(model) {
    if (!valueHelper.isFunction(this.requiredFields)) {
      return true
    }

    const requiredFields = this.requiredFields()
    const invalidFieldName = Object.keys(requiredFields).find(
      (fieldName) => {
        const value = model[fieldName]
        return !requiredFields[fieldName].testMethod(value)
      }
    )
    if (!valueHelper.isStringValue(invalidFieldName)) {
      return true
    }

    alertHelper.error(`A value is required for ${requiredFields[invalidFieldName].label}`)
    return false
  }

  checkValidDatesAndTimes(model) {
    if (!valueHelper.isFunction(this.dateAndTimeFields)) {
      return true
    }

    const dateAndTimeFields = this.dateAndTimeFields()
    const invalidFieldName = Object.keys(dateAndTimeFields).find(
      (fieldName) => {
        const dateAndTimeField = dateAndTimeFields[fieldName]
        const validName = nameForDateAndTimeValidity(fieldName, dateAndTimeField)
        const value = model[validName]
        return !checkDateAndTimeValue(dateAndTimeField, value)

        function checkDateAndTimeValue(dateAndTimeField, value) {
          if (!valueHelper.isValue(value)) {
            return !valueHelper.isSet(dateAndTimeField.required)
          }

          if (!valueHelper.isSet(value.validDate)) {
            return false
          }
          if (dateAndTimeField.type == "date") {
            return true
          }

          return valueHelper.isSet(value.validTime)
        }
      }
    )
    if (!valueHelper.isStringValue(invalidFieldName)) {
      return true
    }

    const dateAndTimeField = dateAndTimeFields[invalidFieldName]
    const requiredNeeded = valueHelper.isSet(dateAndTimeField.required) ? "required" : "needed"
    alertHelper.error(`A valid ${dateAndTimeField.type} is ${requiredNeeded} for ${dateAndTimeField.label}`)
    return false
  }

  changeDate(field, dateString, fieldValid) {
    const name = field.substring(0, field.lastIndexOf("_"))
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeDate(modelName, model, changedModel, name, dateString, fieldValid)

    this.addData(updated)
    this.redrawView()
  }

  changeDateTime(field, dateTimeString, fieldValid) {
    const name = field.substring(0, field.lastIndexOf("_"))
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeDateTime(modelName, model, changedModel, name, dateTimeString, fieldValid)

    this.addData(updated)
    this.redrawView()
  }

  changeField(event) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeField(modelName, model, changedModel, event)

    this.addData(updated)
    this.redrawView()
  }

  changeNumericField(name, valueAsNumber) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeValue(modelName, model, changedModel, name, valueAsNumber)

    this.addData(updated)
    this.redrawView()
  }

  create(modalChangedModel) {
    this.api().create(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }

  initializeDateAndTimeValidities(model) {
    if (!valueHelper.isFunction(this.dateAndTimeFields)) {
      return model
    }

    const updatedModel = { ...model }
    const dateAndTimeFields = this.dateAndTimeFields.bind(this)
    Object.keys(dateAndTimeFields).forEach(
      (fieldName) => {
        const dateAndTimeField = dateAndTimeFields[fieldName]
        if (!valueHelper.isSet(dateAndTimeField.required)) {
          return
        }

        const value = model[fieldName]
        if (!dateHelper.isValidDate(value)) {
          const fieldNameValidity = nameForDateAndTimeValidity(fieldName, dateAndTimeField)
          updatedModel[fieldNameValidity] = initializeDateAndTimeValidity(dateAndTimeField, value)
        }
      }
    )

    return updatedModel
  }

  renderSubmitFooter(submitLabel = "Submit", cancelLabel = "Cancel") {
    const { clearModal } = this.props
    const modelName = this.modelName()

    return (
      <React.Fragment>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(event) => { this.toggleModal(clearModal) }}>
          {cancelLabel}
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={
            (event) => {
              const { changedModel, model } = this.model()

              this.submitModal(modelName, model, changedModel)
            }
          }>
          {submitLabel}
        </button>
      </React.Fragment>
    )
  }

  submitModal(modalModelName, modalModel, modalChangedModel) {
    if (!this.checkRequiredFields(modalModel) && !this.checkValidDatesAndTimes(modalModel)) {
      this.redrawView()
      return
    }

    const { onSubmitModal } = this.props
    if (valueHelper.isFunction(onSubmitModal)) {
      onSubmitModal(modalModelName, modalModel, modalChangedModel)
      return
    }

    alertHelper.error("Implementation error: unless the parent page provides a submit operation, a subclass modal view must override this method")
  }

  submitModalCreateOrUpdate(modalModelName, modalModel, modalChangedModel) {
    if (modalModelName != this.modelName()) {
      this.onError(`Unrecognized ${valueHelper.humanize(this.modelName())} model ${modalModelName}`)
      return
    }
    if (!this.checkRequiredFields(modalModel) || !this.checkValidDatesAndTimes(modalModel)) {
      this.redrawView()
      return
    }

    const { operation } = this.props
    switch (operation) {
      case 'create':
        this.create(modalChangedModel)
        return

      case 'update':
        this.update(modalChangedModel)
        return

      default:
        this.onError(`Unrecognized ${valueHelper.humanize(this.modelName())} operation ${operation}`)
    }
  }

  toggleModal(onSuccess) {
    const { clearModal, onToggleModal } = this.props
    const completeToggle = () => {
      if (valueHelper.isFunction(onToggleModal)) {
        onToggleModal()
      }
      if (valueHelper.isFunction(onSuccess)) {
        onSuccess()
      }
    }

    if (!valueHelper.isFunction(clearModal)) {
      completeToggle()
      return
    }

    clearModal(completeToggle)
  }

  update(modalChangedModel) {
    this.api().update(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }
}

export { AbstractModalViewModel }
