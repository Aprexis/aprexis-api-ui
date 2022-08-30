import { AbstractPageViewModel } from "../"
import { interventionApi, billingClaimApi, interventionHelper, billingClaimHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class InterventionProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoBillingClaim = this.gotoBillingClaim.bind(this)
    this.gotoVerifyIntervention = this.gotoVerifyIntervention.bind(this)
    this.loadData = this.loadData.bind(this)
    this.submitBillingClaim = this.submitBillingClaim.bind(this)
  }

  gotoBillingClaim(billingClaim) {
    const billingClaimId = billingClaimHelper.id(billingClaim)
    const currentPathArray = pathHelper.buildPathArray(window.location)
    const pathArray = [...currentPathArray.slice(0, currentPathArray.length - 1), 'billing-claims', billingClaimId, 'profile']

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const interventionId = pathEntries['interventions'].value
    interventionApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      interventionId,
      (intervention) => { this.addField('intervention', intervention, this.redrawView) },
      this.onError
    )
  }

  gotoVerifyIntervention() {
    const pathArray = pathHelper.buildPathArray(window.location)
    pathArray[pathArray.length - 1] = 'verify'

    pathHelper.gotoPage(pathArray)
  }

  submitBillingClaim(intervention) {
    const userCredentials = userCredentialsHelper.get()
    const interventionId = interventionHelper.id(intervention)

    billingClaimApi.createForIntervention(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      interventionId,
      this.gotoBillingClaim,
      (_failure) => { this.gotoVerifyIntervention() }
    )
  }
}

export { InterventionProfilePageViewModel }
