import { AbstractViewModel } from '../'
import { pathHelper, valueHelper } from '../../../helpers'

class SidebarViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.buildPathToModel = this.buildPathToModel.bind(this)
    this.gotoUserProfile = this.gotoUserProfile.bind(this)
  }

  buildPathToModel(modelPathEntry) {
    const orderedPathEntries = this.orderedPathEntries()
    const pathArray = []

    for (let pathEntryIdx = 0; pathEntryIdx < orderedPathEntries.length; ++pathEntryIdx) {
      const pathEntry = orderedPathEntries[pathEntryIdx]
      if (pathEntry.key == 'profile') {
        break
      }

      pathArray.push(pathEntry.key)
      if (valueHelper.isValue(pathEntry.value) && !isNaN(pathEntry.value)) {
        pathArray.push(pathEntry.value)
      }

      if (pathEntry.key == modelPathEntry.key) {
        break
      }
    }

    return pathArray
  }

  gotoUserProfile() {
    const { pathEntries } = this.props
    const userPathEntry = pathEntries.users

    if (valueHelper.isValue(userPathEntry)) {
      pathHelper.gotoPage(this.buildPathToModel(userPathEntry).concat(['profile']))
    }
  }
}

export { SidebarViewModel }
