import { AbstractViewModel } from './'
import { contextHelper, healthPlanHelper, pathHelper, pharmacyChainHelper, userHelper } from '../../helpers'

class BreadcrumbsViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.gotoPlural = this.gotoPlural.bind(this)
    this.gotoSingular = this.gotoSingular.bind(this)
    this.loadData = this.loadData.bind(this)
    this.modelToBreadcrumb = this.modelToBreadcrumb.bind(this)
    this.pathInformation = this.pathInformation.bind(this)
  }

  gotoPlural(orderedPathEntries, pathKey) {
    contextHelper.gotoPlural(orderedPathEntries, pathKey)
  }

  gotoSingular(orderedPathEntries, pathKey, model) {
    contextHelper.gotoSingular(orderedPathEntries, pathKey, model)
  }

  loadData() {
    this.clearData()
    this.redrawView()
  }

  modelToBreadcrumb(modelName, model) {
    switch (modelName) {
      case 'HealthPlan':
        return healthPlanHelper.toBreadcrumb(model)

      case 'PharmacyChain':
        return pharmacyChainHelper.toBreadcrumb(model)

      case 'User':
        return userHelper.toBreadcrumb(model)

      default:
        return `${model.id}`
    }
  }

  pathInformation(location) {
    const pathEntries = pathHelper.parsePathEntries(window.location)
    const orderedPathEntries = pathHelper.orderedPathEntries(pathEntries)
    const haveProfile = pathHelper.haveProfile(orderedPathEntries)
    if (haveProfile) {
      orderedPathEntries.pop()
    }

    return { haveProfile, orderedPathEntries }
  }
}

export { BreadcrumbsViewModel }
