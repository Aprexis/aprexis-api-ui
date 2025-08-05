import { AbstractViewModel } from "../abstract.vm.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"

class ConfirmableButtonViewModal extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.confirmed = this.confirmed.bind(this)
    this.denied = this.denied.bind(this)
    this.requestConfirmation = this.requestConfirmation.bind(this)
  }

  confirmed() {
    const { onConfirm, onUpdatePage } = this.props

    this.redrawView(() => { onConfirm(onUpdatePage) })
  }

  denied() {
    const { onCancel, onUpdatePage } = this.props

    this.redrawView(
      () => {
        if (valueHelper.isFunction(onCancel)) {
          onCancel(onUpdatePage)
        } else if (valueHelper.isValue(onUpdatePage)) {
          onUpdatePage()
        }
      }
    )
  }

  requestConfirmation(event) {
    event.preventDefault()
    event.stopPropagation()

    const { confirmText, confirmTitle, noLabel, onConfirm, onDeny, yesLabel } = this.props
    this.props.launchModal(
      "confirm",
      {
        confirmText,
        confirmTitle,
        noLabel,
        onConfirm,
        onDeny,
        yesLabel
      }
    )
  }
}

export { ConfirmableButtonViewModal }
