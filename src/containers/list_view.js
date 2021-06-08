import React, { Component } from 'react'
import { RefreshView } from './'
import { FiltersItem } from '../components/filters/filters_item'
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
    const { list, listPluralLabel, onRefreshData, onUpdateFilters, timeout } = this.props
    const myTimeout = valueHelper.isValue(timeout) ? timeout : 5 * 60 * 1000

    return (
      <RefreshView
        label={this.props.listLabel}
        lastPage={this.props.page}
        objects={list}
        onIdle={this.props.refreshData}
        pluralList={listPluralLabel}
        timeout={myTimeout} >
        <ListHeader
          list={this.props.list}
          nav={this.props.nav}
          title={this.props.title}
          titleChildren={this.props.titleChildren}
        />

        <FiltersItem
          filterDescriptions={this.props.filterDescriptions}
          filters={this.props.filters}
          filterOptions={this.props.filterOptions}
          onFilters={this.props.onChangeFilter}
          onRefreshData={onRefreshData}
          onSelectFilters={this.props.onSelectFilters}
          onUpdateFilters={onUpdateFilters}
        />

        <AprexisList
          aprexisTableClassName={this.props.aprexisTableClassName}
          generateGroupRow={this.props.generateGroupRow}
          generateTableHeadings={this.props.generateTableHeadings}
          generateTableRow={this.props.generateTableRow}
          list={list}
          listPluralLabel={listPluralLabel}
          onChangePage={this.props.onChangePage}
          onChangePerPage={this.props.onChangePerPage}
          onSelectRow={this.props.onSelectRow}
          page={this.props.page}
          tableClassName={this.props.tableClassName}
        />

        { this.props.listChildren}
      </RefreshView >
    )
  }
}

export { ListView }
