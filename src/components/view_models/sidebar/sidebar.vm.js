import { AbstractViewModel } from '../'
import { pathHelper } from '../../../helpers'

class SidebarViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.gotoPatientSearchAlgorithms = this.gotoPatientSearchAlgorithms.bind(this)
    this.gotoPharmacyStores = this.gotoPharmacyStores.bind(this)
    this.gotoProfile = this.gotoProfile.bind(this)
  }

  gotoPatientSearchAlgorithms(pathPrefixArray) {
    const pathArray = pathPrefixArray.concat(['patient-search-algorithms'])

    pathHelper.gotoPage(pathArray)
  }

  gotoPharmacyStores(pathPrefixArray) {
    const pathArray = pathPrefixArray.concat(['pharmacy-stores'])

    pathHelper.gotoPage(pathArray)
  }

  gotoProfile(pathPrefixArray) {
    const pathArray = pathPrefixArray.concat(['profile'])

    pathHelper.gotoPage(pathArray)
  }
}

export { SidebarViewModel }
