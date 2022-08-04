import React from "react"
import { AbstractViewModel } from "../"
import { dateHelper, fieldHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { alertHelper } from '../../../helpers'

function initializeDateAndTimeValidity(dateAndTimeField, value) {
  const validDate = dateHelper.isValidDate(value)

  switch (dateAndTimeField.type) {
    case "date":
      return { validDate, value }

    case "date/time":
      return { validDate, validTime: validDate, value }

    case "time":
      return { validTime: validDate, value }

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

    case "time":
      return `${fieldName}_TVALID`

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

    this.addEntry = this.addEntry.bind(this)
    this.checkRequiredFields = this.checkRequiredFields.bind(this)
    this.checkValidDatesAndTimes = this.checkValidDatesAndTimes.bind(this)
    this.changeDate = this.changeDate.bind(this)
    this.changeDateTime = this.changeDateTime.bind(this)
    this.changeTime = this.changeTime.bind(this)
    this.changeField = this.changeField.bind(this)
    this.changeFieldValue = this.changeFieldValue.bind(this)
    this.changeNumericField = this.changeNumericField.bind(this)
    this.create = this.create.bind(this)
    this.initializeDateAndTimeValidities = this.initializeDateAndTimeValidities.bind(this)
    this.isRequired = this.isRequired.bind(this)
    this.removeEntry = this.removeEntry.bind(this)
    this.renderSubmitFooter = this.renderSubmitFooter.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.submitModalCreateOrUpdate = this.submitModalCreateOrUpdate.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.update = this.update.bind(this)
  }

  addEntry(field, matchField, newEntry) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.addEntry(
      modelName,
      model,
      changedModel,
      field,
      matchField,
      newEntry
    )

    this.addData(updated, this.redrawView)
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

    const dateAndTimeFields = this.dateAndTimeFields(model)
    const invalidFieldName = Object.keys(dateAndTimeFields).find(
      (fieldName) => {
        const dateAndTimeField = dateAndTimeFields[fieldName]
        const validName = nameForDateAndTimeValidity(fieldName, dateAndTimeField)
        const value = model[validName]

        return !checkDateAndTimeValue(dateAndTimeField, value)

        function checkDateAndTimeValue(dateAndTimeField, value) {
          if (!valueHelper.isValue(value) || !valueHelper.isValue(value.value)) {
            return !valueHelper.isSet(dateAndTimeField.required)
          }

          if (!checkValidDate(dateAndTimeField, value)) {
            return false
          }

          return checkValidTime(dateAndTimeField, value)

          function checkValidDate(dateAndTimeField, value) {
            if (dateAndTimeField.type == "time") {
              return true
            }

            return valueHelper.isSet(value.validDate)
          }

          function checkValidTime(dateAndTimeField, value) {
            if (dateAndTimeField.type == "date") {
              return true
            }

            return valueHelper.isSet(value.validTime)
          }
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
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeDate(
      modelName,
      model,
      changedModel,
      field,
      dateString,
      { value: dateString, validDate: fieldValid }
    )

    this.addData(updated, this.redrawView)
  }

  changeDateTime(field, dateTimeString, fieldValid) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const fieldName = field.replace(/_Date$/, "").replace(/_Time$/, "")
    const updated = fieldHelper.changeDateTime(
      modelName,
      model,
      changedModel,
      fieldName,
      dateTimeString,
      fieldValid
    )

    this.addData(updated, this.redrawView)
  }

  changeField(event) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeField(modelName, model, changedModel, event)

    this.addData(updated, this.redrawView)
  }

  changeFieldValue(name, value) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeValue(modelName, model, changedModel, name, value)

    this.addData(updated, this.redrawView)
  }

  changeNumericField(name, valueAsNumber) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeValue(modelName, model, changedModel, name, valueAsNumber)

    this.addData(updated, this.redrawView)
  }

  changeTime(field, timeString, fieldValid) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeTime(
      modelName,
      model,
      changedModel,
      field,
      timeString,
      { value: timeString, validTime: fieldValid }
    )

    this.addData(updated, this.redrawView)
  }

  create(changedModel) {
    super.create(changedModel, () => { this.toggleModal(this.props.onUpdateView) })
  }

  initializeDateAndTimeValidities(model) {
    if (!valueHelper.isFunction(this.dateAndTimeFields)) {
      return model
    }

    const updatedModel = { ...model }
    const dateAndTimeFields = this.dateAndTimeFields(model)
    Object.keys(dateAndTimeFields).forEach(
      (fieldName) => {
        const dateAndTimeField = dateAndTimeFields[fieldName]
        if (!valueHelper.isSet(dateAndTimeField.required)) {
          return
        }

        const value = model[fieldName]
        const fieldNameValidity = nameForDateAndTimeValidity(fieldName, dateAndTimeField)
        updatedModel[fieldNameValidity] = initializeDateAndTimeValidity(dateAndTimeField, value)
      }
    )

    return updatedModel
  }

  isRequired(fieldName) {
    return valueHelper.isValue(this.requiredFields()[fieldName])
  }

  removeEntry(field, matchField, oldEntry) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.removeEntry(
      modelName,
      model,
      changedModel,
      field,
      matchField,
      oldEntry
    )

    this.addData(updated, this.redrawView)
  }

  renderSubmitFooter(submitLabel = "Submit", cancelLabel = "Cancel") {
    const { clearModal } = this.props
    const modelName = this.modelName()

    return (
      <React.Fragment>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(_event) => { this.toggleModal(clearModal) }}>
          {cancelLabel}
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={
            (_event) => {
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
    const myModalChangedModel = this.helper().buildChanged(modalModel, modalChangedModel)
    if (valueHelper.isFunction(onSubmitModal)) {
      onSubmitModal(modalModelName, modalModel, myModalChangedModel)
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
    const myModalChangedModel = this.helper().buildChanged(modalModel, modalChangedModel)
    switch (operation) {
      case 'create':
        this.create(myModalChangedModel)
        return

      case 'update':
        this.update(myModalChangedModel)
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

  update(changedModel) {
    super.update(changedModel, () => { this.toggleModal(this.props.onUpdateView) })
  }
}

export { AbstractModalViewModel }
