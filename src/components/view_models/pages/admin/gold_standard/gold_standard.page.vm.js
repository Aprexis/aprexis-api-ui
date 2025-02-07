import { AbstractPageViewModel } from "../../"
import { pathHelper } from "../../../../../helpers"

class GoldStandardPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoDrugItemsPage = this.gotoDrugItemsPage.bind(this)
    this.gotoGenericProductClinicalsPage = this.gotoGenericProductClinicalsPage.bind(this)
    this.gotoGenericProductsPage = this.gotoGenericProductsPage.bind(this)
    this.gotoSpecificDrugProductsPage = this.gotoSpecificDrugProductsPage.bind(this)
    this.gotoMarketedProductsPage = this.gotoMarketedProductsPage.bind(this)
    this.gotoMaintenanceMedicationsPage = this.gotoMaintenanceMedicationsPage.bind(this)
    this.gotoPackageVersionsPage = this.gotoPackageVersionsPage.bind(this)
    this.gotoPackagesPage = this.gotoPackagesPage.bind(this)
    this.gotoProductsPage = this.gotoProductsPage.bind(this)
    this.gotoSpecificProductsPage = this.gotoSpecificProductsPage.bind(this)
    this.gotoTherapeuticConceptsPage = this.gotoTherapeuticConceptsPage.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoDrugItemsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "drug-items"])
  }

  gotoGenericProductClinicalsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "generic-product-clinicals"])
  }

  gotoGenericProductsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "generic-products"])
  }

  gotoMaintenanceMedicationsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", 'maintenance-medications'])
  }

  gotoMarketedProductsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "marketed-products"])
  }

  gotoPackageVersionsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "package-versions"])
  }

  gotoPackagesPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "packages"])
  }

  gotoProductsPage() {
    pathHelper.gotoPage(["admin", "gold-standard", "products"])
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
