import { AbstractPageViewModel } from "../../"
import { pathHelper } from "../../../../../helpers"

class GoldStandardPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoTherapeuticConceptsPage = this.gotoTherapeuticConceptsPage.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoTherapeuticConceptsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "therapeutic-concepts"])
  }

  loadData() {
    this.clearData(false)
  }
}

export { GoldStandardPageViewModel }
