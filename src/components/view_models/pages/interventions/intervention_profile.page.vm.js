import { AbstractPageViewModel } from "../abstract.page.vm.js"
import { interventionApi, billingClaimApi, interventionHelper, billingClaimHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

class InterventionProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.editExternalModal = this.editExternalModal.bind(this)
    this.gotoBillingClaim = this.gotoBillingClaim.bind(this)
    this.gotoVerifyIntervention = this.gotoVerifyIntervention.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.submitBillingClaim = this.submitBillingClaim.bind(this)
  }

  api() {
    return interventionApi
  }

  editExternalModal(interventionToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      this.helper().id(interventionToEdit),
      (intervention) => {
        this.props.launchModal(
          "external-intervention-profile",
          { operation: "update", onUpdateView: this.loadData, intervention })
      },
      this.onError
    )
  }

  gotoBillingClaim(billingClaim) {
    const billingClaimId = billingClaimHelper.id(billingClaim)
    const currentPathArray = pathHelper.buildPathArray(window.location)
    const pathArray = [...currentPathArray.slice(0, currentPathArray.length - 1), 'billing-claims', billingClaimId, 'profile']

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return interventionHelper
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const interventionId = pathEntries['interventions'].value
    this.api().profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
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
    const interventionId = this.helper().id(intervention)

    billingClaimApi.createForIntervention(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      interventionId,
      this.gotoBillingClaim,
      (_failure) => { this.gotoVerifyIntervention() }
    )
  }
}

export { InterventionProfilePageViewModel }
