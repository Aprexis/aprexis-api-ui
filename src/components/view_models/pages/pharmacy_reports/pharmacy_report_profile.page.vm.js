import { AbstractPageViewModel } from '../'
import { pharmacyReportApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from '../../../../helpers'

class PharmacyReportProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const pharmacy_report_id = pathHelper.pathEntryValue(pathEntries, 'pharmacy-reports')
    pharmacyReportApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      pharmacy_report_id,
      (pharmacyReport) => { this.addField('pharmacyReport', pharmacyReport, this.redrawView) },
      this.onError
    )
  }
}

export { PharmacyReportProfilePageViewModel }
