import { AbstractPageViewModel } from "../../../abstract.page.vm.js"
import { goldStandardMaintenanceMedicationApi, goldStandardMaintenanceMedicationHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class MaintenanceMedicationProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoMarketedProduct = this.gotoMarketedProduct.bind(this)
    this.gotoPackage = this.gotoPackage.bind(this)
    this.gotoProduct = this.gotoProduct.bind(this)
    this.gotoSpecificProduct = this.gotoSpecificProduct.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoMarketedProduct(goldStandardMaintenanceMedication) {
    pathHelper.gotoPage(
      [
        "admin",
        "gold-standard",
        "marketed-products",
        goldStandardMaintenanceMedicationHelper.goldStandardMarketedProductId(goldStandardMaintenanceMedication),
        "profile"]
    )
  }

  gotoPackage(goldStandardMaintenanceMedication) {
    pathHelper.gotoPage(
      [
        "admin",
        "gold-standard",
        "packages",
        goldStandardMaintenanceMedicationHelper.goldStandardPackageId(goldStandardMaintenanceMedication),
        "profile"]
    )
  }

  gotoProduct(goldStandardMaintenanceMedication) {
    pathHelper.gotoPage(
      [
        "admin",
        "gold-standard",
        "products",
        goldStandardMaintenanceMedicationHelper.goldStandardProductId(goldStandardMaintenanceMedication),
        "profile"]
    )
  }

  gotoSpecificProduct(goldStandardMaintenanceMedication) {
    pathHelper.gotoPage(
      [
        "admin",
        "gold-standard",
        "specific-products",
        goldStandardMaintenanceMedicationHelper.goldStandardSpecificProductId(goldStandardMaintenanceMedication),
        "profile"]
    )
  }

  loadData() {
    this.clearData(false)
    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const package_id = pathHelper.pathEntryValue(pathEntries, "maintenance-medications")

    goldStandardMaintenanceMedicationApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      package_id,
      (maintenanceMedication) => { this.addField("maintenanceMedication", maintenanceMedication, this.redrawView) },
      this.onError
    )
  }
}

export { MaintenanceMedicationProfilePageViewModel }
