import { AbstractViewModel } from '../'
import { pathHelper } from '../../../helpers'

class SidebarViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.gotoList = this.gotoList.bind(this)
    this.gotoPage = this.gotoPage.bind(this)
    this.gotoProfile = this.gotoProfile.bind(this)
  }

  gotoList(pathPrefixArray, listName) {
    this.gotoPage(pathPrefixArray, listName)
  }

  gotoPage(pathPrefixArray, pageName) {
    const pathArray = pathPrefixArray.concat([pageName])

    pathHelper.gotoPage(pathArray)
  }

  gotoProfile(pathPrefixArray) {
    this.gotoPage(pathPrefixArray, "profile")
  }
}

export { SidebarViewModel }
