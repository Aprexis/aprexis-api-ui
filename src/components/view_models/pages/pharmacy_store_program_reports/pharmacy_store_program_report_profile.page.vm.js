import { AbstractPageViewModel } from '../abstract.page.vm.js'
import { pharmacyStoreProgramReportApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from '../../../../helpers/index.js'

class PharmacyStoreProgramReportProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const pharmacy_store_program_report_id = pathHelper.pathEntryValue(pathEntries, 'pharmacy-store-program-reports')
    pharmacyStoreProgramReportApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      pharmacy_store_program_report_id,
      (pharmacyStoreProgramReport) => { this.addField('pharmacyStoreProgramReport', pharmacyStoreProgramReport, this.redrawView) },
      this.onError
    )
  }
}

export { PharmacyStoreProgramReportProfilePageViewModel }
