import { pathHelper } from '../../../helpers'
import { AbstractViewModel } from '../'

class SidebarViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.gotoList = this.gotoList.bind(this)
    this.gotoPage = this.gotoPage.bind(this)
    this.gotoProfile = this.gotoProfile.bind(this)
  }

  canCreate() {
    // TODO: need to figure out what needs to be done here. May need more information than we have at this point.
    return true
  }

  gotoList(pathPrefixArray, listName, ...params) {
    this.gotoPage(pathPrefixArray, listName, ...params)
  }

  gotoPage(pathPrefixArray, pageName, ...params) {
    const pathArray = pathPrefixArray.concat([pageName])

    pathHelper.gotoPage(pathArray, ...params)
  }

  gotoProfile(pathPrefixArray, ...params) {
    this.gotoPage(pathPrefixArray, "profile", ...params)
  }
}

export { SidebarViewModel }
