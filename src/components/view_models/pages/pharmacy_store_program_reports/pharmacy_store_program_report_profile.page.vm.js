import { AbstractPageViewModel } from '../'
import { pharmacyStoreProgramReportApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, userCredentialsHelper } from '../../../../helpers'

class PharmacyStoreProgramReportProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const pharmacy_store_program_report_id = pathEntries['pharmacy-store-program-reports'].value
    pharmacyStoreProgramReportApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      pharmacy_store_program_report_id,
      (pharmacyStoreProgramReport) => { this.addField('pharmacyStoreProgramReport', pharmacyStoreProgramReport, this.redrawView) },
      this.onError
    )
  }
}

export { PharmacyStoreProgramReportProfilePageViewModel }
