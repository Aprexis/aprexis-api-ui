import { AbstractViewModel } from "./"
import { contextHelper, pathHelper, valueHelper } from "../../helpers"
import { pathKeys } from '../../types'

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

  modelToBreadcrumb(pathKey, model) {
    const pathKeyEntry = pathKeys[pathKey]

    if (!valueHelper.isValue(pathKeyEntry) ||
      !valueHelper.isValue(pathKeyEntry) ||
      !valueHelper.isValue(pathKeyEntry.helper) ||
      !valueHelper.isFunction(pathKeyEntry.helper.toBreadcrumb)) {
      return `${model.id}`
    }

    return pathKeyEntry.helper.toBreadcrumb(model)
  }

  pathInformation(location) {
    const pathEntries = this.pathEntries()
    const orderedPathEntries = this.orderedPathEntries(pathEntries)
    const haveProfile = pathHelper.haveProfile(orderedPathEntries)
    if (haveProfile) {
      orderedPathEntries.pop()
    }

    return { haveProfile, orderedPathEntries }
  }
}

export { BreadcrumbsViewModel }
