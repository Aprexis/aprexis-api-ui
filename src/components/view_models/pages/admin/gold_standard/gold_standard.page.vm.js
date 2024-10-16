import { AbstractPageViewModel } from "../../"
import { pathHelper } from "../../../../../helpers"

class GoldStandardPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoGenericProductClinicalsPage = this.gotoGenericProductClinicalsPage.bind(this)
    this.gotoGenericProductsPage = this.gotoGenericProductsPage.bind(this)
    this.gotoSpecificDrugProductsPage = this.gotoSpecificDrugProductsPage.bind(this)
    this.gotoSpecificProductsPage = this.gotoSpecificProductsPage.bind(this)
    this.gotoTherapeuticConceptsPage = this.gotoTherapeuticConceptsPage.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoGenericProductClinicalsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "generic-product-clinicals"])
  }

  gotoGenericProductsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "generic-products"])
  }

  gotoSpecificDrugProductsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "specific-drug-products"])
  }

  gotoSpecificProductsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "specific-products"])
  }

  gotoTherapeuticConceptsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "therapeutic-concepts"])
  }

  loadData() {
    this.clearData(false)
  }
}

export { GoldStandardPageViewModel }
