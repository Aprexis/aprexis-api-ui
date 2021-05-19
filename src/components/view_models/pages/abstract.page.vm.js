import { AbstractViewModel } from "../"
import { valueHelper } from "../../../helpers"
class AbstractPageViewModel extends AbstractViewModel {
  constructor(props) {
    if (new.target === AbstractPageViewModel) {
      throw new TypeError("Cannot directly instantiate AbstractPageViewModel instance; create a subclass instead")
    }

    super(props)

    this.clearModal = this.clearModal.bind(this)
  }

  clearModal(nextOperation) {
    this.removeField("modal")

    if (valueHelper.isFunction(nextOperation)) {
      nextOperation()
    }
  }
}

export { AbstractPageViewModel }
