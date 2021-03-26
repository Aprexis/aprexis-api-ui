import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { Filter } from '../filters'
import { FiltersModalViewModel } from '../view_models/modals'
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from '../../containers/modals'
import { pathHelper, valueHelper } from '../../helpers'

class FiltersModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new FiltersModalViewModel(
      {
        pathEntries: pathHelper.parsePathEntries(window.location),
        ...this.props,
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
        <Container>
          {filterRows}
        </Container>
      </AprexisModal>
    )
  }

  renderFilterRow(filterDescription, filters, filterIdx) {
    return (
      <Filter
        filters={filters}
        filterDescription={filterDescription}
        key={`filter-${filterIdx}`}
        onChange={this.vm.change}
        onChangeDay={this.vm.changeDay}
        onChangeId={this.vm.changeId}
        readOnly={false}
        setValidDate={this.vm.setValidDate}
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
    return (
      <React.Fragment>
        <button
          className='btn btn-sm btn-secondary mr-auto'
          onClick={this.vm.clearModal}>
          Cancel
        </button>
        <button
          className='btn btn-sm btn-primary'
          onClick={(event) => { this.vm.submitFilters() }}>
          Filter
        </button>
      </React.Fragment>
    )
  }

  renderHeader() {
    const { parentTitle } = this.props
    const title = `Filters for ${parentTitle}`

    return (
      <AprexisModalHeader title={title} />
    )
  }
}

const aprexisFiltersModal = aprexisWrapperModal(FiltersModal)
export { aprexisFiltersModal as FiltersModal }
