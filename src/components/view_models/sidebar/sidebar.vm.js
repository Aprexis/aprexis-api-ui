import { AbstractViewModel } from '../'
import { pathHelper } from '../../../helpers'

class SidebarViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.gotoList = this.gotoList.bind(this)
    this.gotoProfile = this.gotoProfile.bind(this)
  }

  gotoList(pathPrefixArray, listName) {
    const pathArray = pathPrefixArray.concat([listName])

    pathHelper.gotoPage(pathArray)
  }

  gotoProfile(pathPrefixArray) {
    const pathArray = pathPrefixArray.concat(['profile'])

    pathHelper.gotoPage(pathArray)
  }
}

export { SidebarViewModel }
