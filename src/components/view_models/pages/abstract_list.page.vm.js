import { AbstractPageViewModel } from "./"
import { MAXIMUM_PER_PAGE, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, alertHelper, userCredentialsHelper } from "../../../helpers"

class AbstractListPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    if (new.target === AbstractListPageViewModel) {
      throw new TypeError("Cannot directly instantiate AbstractListPageViewModel instance; create a subclass instead")
    }

    super(props)

    this.buildFilterFor = this.buildFilterFor.bind(this)
    this.changePage = this.changePage.bind(this)
    this.changePerPage = this.changePerPage.bind(this)
    this.defaultPage = this.defaultPage.bind(this)
    this.fetchList = this.fetchList.bind(this)
    this.lastPageNumber = this.lastPageNumber.bind(this)
    this.selectFilters = this.selectFilters.bind(this)
    this.updateFilters = this.updateFilters.bind(this)
    this.updateSorting = this.updateSorting.bind(this)
  }

  buildFilterFor(queryParam, model) {
    if (!valueHelper.isValue(model) || !valueHelper.isValue(model.value)) {
      return {}
    }

    return { [queryParam]: model.value }
  }

  changePage(number) {
    const lastPageNumber = this.lastPageNumber()
    if (number < 1 || number > lastPageNumber) {
      alertHelper.error(`Page number ${number} is out-of-range (limits: 1 - ${lastPageNumber})`)
      return
    }

    const { page } = this.data
    this.addField("page", { ...page, number }, this.refreshData)
  }

  changePerPage(perPage) {
    if (perPage < 1) {
      alertHelper.error("Minimum per page size is 1")
      return
    }

    if (perPage > MAXIMUM_PER_PAGE) {
      alertHelper.error("Maximum per page size is 100")
      return
    }

    const { page } = this.data
    this.addField("page", { ...page, size: perPage }, this.refreshData)
  }

  defaultPage() {
    return pageHelper.updatePageFromLastPage()
  }

  fetchList(listMethods, onSuccess, onError) {
    const { reconnectAndRetry } = this.props
    const userCredentials = userCredentialsHelper.get()
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()
    const params = { ...filters, ...sorting, page }

    if (valueHelper.isFunction(listMethods)) {
      listMethods(apiEnvironmentHelper.apiEnvironment(userCredentials, reconnectAndRetry), params, onSuccess, onError)
      return
    }

    let blankIdx = -1
    for (let idx = 0; idx < listMethods.length; ++idx) {
      const { pathKey, method } = listMethods[idx]
      if (!valueHelper.isStringValue(pathKey)) {
        blankIdx = idx
        continue
      }

      if (listFor(pathEntries, pathKey, method, userCredentials, params, onSuccess, onError)) {
        return
      }
    }
    if (blankIdx >= 0) {
      listMethods[blankIdx].method(apiEnvironmentHelper.apiEnvironment(userCredentials, reconnectAndRetry), params, onSuccess, onError)
      return
    }

    throw new Error(`Internal Error: unrecogonized path ${window.location.pathname}`)

    function listFor(pathEntries, pathKey, method, userCredentials, params, onSuccess, onError) {
      const model = pathEntries[pathKey]
      if (!valueHelper.isValue(model) || !valueHelper.isValue(model.value)) {
        return false
      }

      method(apiEnvironmentHelper.apiEnvironment(userCredentials, reconnectAndRetry), model.value, params, onSuccess, onError)
      return true
    }
  }

  lastPageNumber() {
    const { page, lastPage } = this.data
    if (!valueHelper.isValue(page)) {
      return pageHelper.lastNumber(lastPage)
    }

    return pageHelper.lastNumber(page)
  }

  selectFilters(filterDescriptions, filters) {
    this.props.launchModal(
      "filters",
      {
        filterDescriptions,
        filters,
        onRefreshData: this.refreshData,
        onUpdateFilters: this.updateFilters,
        parentTitle: this.title()
      }
    )
  }

  updateFilters(filters, nextOperation) {
    this.addData({ filters, page: this.defaultPage(), lastPage: undefined }, nextOperation)
  }

  updateSorting(sort, nextOperation) {
    this.addData({ sorting: { sort } }, nextOperation)
  }
}

export { AbstractListPageViewModel }
