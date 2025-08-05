import { AbstractModalViewModel } from "./abstract.modal.vm.js"

class ConfirmModalViewModal extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.confirm = this.confirm.bind(this)
    this.deny = this.deny.bind(this)
  }

  confirm() {
    this.toggleModal(this.props.onConfirm)
  }

  deny() {
    this.toggleModal(this.props.onDeny)
  }
}

export { ConfirmModalViewModal }
