import { Component } from 'react'
import { Form } from 'reactstrap'
import { Filter } from '../filters/filter.js'
import { FiltersModalViewModel } from '../view_models/modals/index.js'
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from '../../containers/modals/index.js'
import { valueHelper } from '@aprexis/aprexis-api-utility'

class FiltersModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new FiltersModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.renderFilterRow = this.renderFilterRow.bind(this)
    this.renderFilterRows = this.renderFilterRows.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { filterDescriptions, filters } = this.state
    const filterRows = this.renderFilterRows(filterDescriptions, filters)

    return (
      <AprexisModal
        {...this.props}
        modalClassName='filters modal-w'
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Form>
          {filterRows}
        </Form>
      </AprexisModal>
    )
  }

  renderFilterRow(filterDescription, filters, filterIdx) {
    const { filterValidations } = this.state

    return (
      <Filter
        {...this.props}
        filters={filters}
        filterDescription={filterDescription}
        filterValidations={filterValidations}
        key={`filter-${filterIdx}`}
        onChange={this.vm.change}
        onChangeDay={this.vm.changeDay}
        onChangeDateTime={this.vm.changeDateTime}
        onChangeId={this.vm.changeId}
        readOnly={false}
      />
    )
  }

  renderFilterRows(filterDescriptions, filters) {
    if (!valueHelper.isValue(filterDescriptions)) {
      return
    }

    return filterDescriptions.map(
      (filterDescription, filterIdx) => { return this.renderFilterRow(filterDescription, filters, filterIdx) }
    )
  }

  renderFooter() {
    const { clearModal, toggleModal } = this.props

    return (
      <div>
        <button
          className='btn btn-sm btn-secondary mr-auto'
          onClick={(event) => { toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className='btn btn-sm btn-primary'
          onClick={(event) => { this.vm.submitFilters() }}>
          Filter
        </button>
      </div>
    )
  }

  renderHeader() {
    const { parentTitle } = this.props
    const title = `Filters for ${parentTitle}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisFiltersModal = aprexisWrapperModal(FiltersModal)
export { aprexisFiltersModal as FiltersModal }
