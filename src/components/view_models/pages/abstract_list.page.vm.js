import { AbstractPageViewModel } from './'
import { alertHelper, MAXIMUM_PER_PAGE, pageHelper, valueHelper } from '../../../helpers'

class AbstractListPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    if (new.target === AbstractListPageViewModel) {
      throw new TypeError('Cannot directly instantiate AbstractListPageViewModel instance; create a subclass instead')
    }

    super(props)

    this.changePage = this.changePage.bind(this)
    this.changePerPage = this.changePerPage.bind(this)
    this.defaultPage = this.defaultPage.bind(this)
    this.lastPageNumber = this.lastPageNumber.bind(this)
  }

  changePage(number) {
    const lastPageNumber = this.lastPageNumber()
    if (number < 1 || number > lastPageNumber) {
      alertHelper.error(`Page number ${number} is out-of-range (limits: 1 - ${lastPageNumber})`)
      return
    }

    const { page } = this.data
    this.addField('page', { ...page, number })
    this.refreshData()
  }

  changePerPage(perPage) {
    if (perPage < 1) {
      alertHelper.error('Minimum per page size is 1')
      return
    }

    if (perPage > MAXIMUM_PER_PAGE) {
      alertHelper.error('Maximum per page size is 100')
      return
    }

    const { page } = this.data
    this.addField('page', { ...page, size: perPage })
    this.refreshData()
  }

  defaultPage() {
    return pageHelper.updatePageFromLastPage()
  }

  lastPageNumber() {
    const { page, lastPage } = this.data
    if (!valueHelper.isValue(page)) {
      return pageHelper.lastNumber(lastPage)
    }

    return pageHelper.lastNumber(page)
  }
}

export { AbstractListPageViewModel }
