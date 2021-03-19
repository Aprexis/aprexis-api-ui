import React, { Component } from 'react'
import { RefreshView } from './'
import { FiltersItem } from '../components/filters'
import { Modals } from '../components/modals'
import { AprexisList } from '../components/shared'
import { valueHelper } from '../helpers'

class ListHeader extends Component {
  constructor(props) {
    super(props)

    this.generateNav = this.generateNav.bind(this)
  }

  generateNav(list) {
    const { nav } = this.props
    if (!valueHelper.isFunction(nav)) {
      return
    }

    return nav(list)
  }

  render() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 ml-3">
        <h1 className="h2">
          {this.props.title}
          {this.props.titleChildren}
        </h1>

        {this.generateNav(this.props.list)}
      </div>
    )
  }
}

class ListView extends Component {
  render() {
    const { list, listPluralLabel, timeout } = this.props
    const myTimeout = valueHelper.isValue(timeout) ? timeout : 5 * 60 * 1000

    return (
      <RefreshView
        label={this.props.listLabel}
        objects={list}
        onIdle={this.props.refreshData}
        pluralList={listPluralLabel}
        timeout={myTimeout} >
        <ListHeader list={this.props.list} nav={this.props.nav} title={this.props.title} titleChildren={this.props.titleChildren} />

        <FiltersItem
          filterDescriptions={this.props.filterDescriptions}
          filters={this.props.filters}
          filterOptions={this.props.filterOptions}
          onFilters={this.props.onChangeFilter}
          onRefresh={this.props.onRefresh}
          onSelectFilters={this.props.onSelectFilters}
          onUpdateFilters={this.props.onUpdateFilters}
          onSubmitFilters={this.props.onSubmitFilters}
        />

        <Modals
          {...this.props.modal}
          onClearAlert={this.props.onClearAlert}
          onClearModal={this.props.onClearModal}
          onLoadData={this.props.onLoadData}
          onSubmitModal={this.props.submitModal}
          modalProps={{ filters: { onSubmitFilters: this.props.onSubmitFilters }, ...this.props.modalProps }}
          parentTitle={listPluralLabel}
        />

        <AprexisList
          aprexisTableClassName={this.props.aprexisTableClassName}
          generateGroupRow={this.props.generateGroupRow}
          generateTableHeadings={this.props.generateTableHeadings}
          generateTableRow={this.props.generateTableRow}
          list={list}
          listPluralLabel={listPluralLabel}
          multipleRowsSelection={this.props.multipleRowsSelection}
          onChangePage={this.props.onChangePage}
          onChangePerPage={this.props.onChangePerPage}
          page={this.props.page}
          tableClassName={this.props.tableClassName}
        />

        { this.props.listChildren}
      </RefreshView >
    )
  }
}

export { ListView }
