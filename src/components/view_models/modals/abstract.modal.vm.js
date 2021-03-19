import React from 'react'
import { AbstractViewModel } from '../'
import { alertHelper, valueHelper } from '../../../helpers'

class AbstractModalViewModel extends AbstractViewModel {
  constructor(props) {
    if (new.target === AbstractModalViewModel) {
      throw new TypeError('Cannot directly instantiate AbstractModalViewModel instance; create a subclass instead')
    }

    super(props)

    this.changeField = this.changeField.bind(this)
    this.renderSubmitFooter = this.renderSubmitFooter.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  changeField(event) {
    const { changedModel, modal } = this.model()
    const updated = this.helper().changeField(modal, changedModel, event)

    this.addData(updated)
    this.redrawView()
  }

  renderSubmitFooter(submitLabel = 'Submit', cancelLabel = 'Cancel') {
    const modelName = this.modelName()

    return (
      <React.Fragment>
        <button
          className='btn btn-sm btn-secondary mr-auto'
          onClick={(event) => { this.props.onClearModal() }}>
          {cancelLabel}
        </button>
        <button
          className='btn btn-sm btn-primary'
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
    const { onSubmitModal } = this.props

    if (valueHelper.isFunction(onSubmitModal)) {
      onSubmitModal(modalModelName, modalModel, modalChangedModel)
      return
    }

    alertHelper.error('Implementation error: unless the parent page provides a submit operation, a subclass modal view must override this method')
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
}

export { AbstractModalViewModel }
