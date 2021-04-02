import { AbstractViewModel } from '../'
import { pathHelper, valueHelper } from '../../../helpers'

class SidebarViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.buildPathToModel = this.buildPathToModel.bind(this)
    this.gotoHealthPlanPatientSearchAlgorithms = this.gotoHealthPlanPatientSearchAlgorithms.bind(this)
    this.gotoHealthPlanProfile = this.gotoHealthPlanProfile.bind(this)
    this.gotoUserProfile = this.gotoUserProfile.bind(this)
  }

  buildPathToModel(modelPath) {
    const orderedPathEntries = this.orderedPathEntries()
    const pathArray = []

    let pathEntryIdx
    for (pathEntryIdx = 0; pathEntryIdx < orderedPathEntries.length; ++pathEntryIdx) {
      const pathEntry = orderedPathEntries[pathEntryIdx]
      if (pathEntry.key == 'profile') {
        break
      }

      pathArray.push(pathEntry.key)
      if (valueHelper.isValue(pathEntry.value) && !isNaN(pathEntry.value)) {
        pathArray.push(pathEntry.value)
      }

      if (pathEntry.key == modelPath) {
        break
      }
    }
    if (pathEntryIdx === orderedPathEntries || (orderedPathEntries[pathEntryIdx].key != modelPath)) {
      return
    }

    return pathArray
  }

  gotoHealthPlanPatientSearchAlgorithms() {
    const pathArray = this.buildPathToModel("health-plans").concat(['patient-search-algorithms'])

    if (valueHelper.isValue(pathArray)) {
      pathHelper.gotoPage(pathArray)
    }
  }

  gotoHealthPlanProfile() {
    const pathArray = this.buildPathToModel("health-plans").concat(['profile'])

    if (valueHelper.isValue(pathArray)) {
      pathHelper.gotoPage(pathArray)
    }
  }

  gotoUserProfile() {
    const pathArray = this.buildPathToModel("users").concat(['profile'])

    if (valueHelper.isValue(pathArray)) {
      pathHelper.gotoPage(pathArray)
    }
  }
}

export { SidebarViewModel }
