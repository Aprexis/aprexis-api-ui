import { AbstractViewModel } from "../"
class AbstractPageViewModel extends AbstractViewModel {
  constructor(props) {
    if (new.target === AbstractPageViewModel) {
      throw new TypeError("Cannot directly instantiate AbstractPageViewModel instance; create a subclass instead")
    }

    super(props)
  }
}

export { AbstractPageViewModel }
