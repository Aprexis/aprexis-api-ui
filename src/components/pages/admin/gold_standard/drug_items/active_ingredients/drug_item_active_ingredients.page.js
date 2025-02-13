import React, { Component } from "react"
import { DrugItemActiveIngredientsPageViewModel } from "../../../../../view_models/pages/admin/gold_standard/drug_items/active_ingredients"
import { ListView } from "../../../../../../containers"
import { valueHelper, goldStandardDrugItemActiveIngredientHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../../../helpers"

const headings = [
  {
    name: "Label",
    field: "ingredient_name.ingredient_name,strength,strength_unit_code,per_volume,per_volume_unit_code",
    method: "label"
  },
  {
    name: "Drug Item",
    field: "drug_item.item_name_long",
    method: "goldStandardDrugItemNameLong"
  },
]

class DrugItemActiveIngredientsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DrugItemActiveIngredientsPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  generateTableHeadings() {
    const { filters, sorting } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listHeader(
      {
        filters,
        headings,
        listName: "drug-item-active-ingredients",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(drugItem) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoDrugItemActiveIngredientProfile,
        headings,
        helper: goldStandardDrugItemActiveIngredientHelper,
        launchModal: this.props.launchModal,
        modelName: 'drugItemActiveIngredient',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: drugItem
      }
    )
  }

  render() {
    const { filters } = this.state
    const filtersOptions = this.vm.filtersOptions()
    const filterDescriptions = this.vm.filterDescriptions(filters, filtersOptions)

    return (
      <ListView
        {...valueHelper.importantProps(this.props)}
        context={this.props.context}
        currentAdminUser={this.props.currentAdminUser}
        currentUser={this.props.currentUser}
        filterDescriptions={filterDescriptions}
        filters={filters}
        generateTableHeadings={this.generateTableHeadings}
        generateTableRow={this.generateTableRow}
        list={this.state.drugItemActiveIngredients}
        listLabel="Drug Item Active Ingredient"
        listPluralLabel="Drug Item Active Ingredients"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Drug Item Active Ingredients"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { DrugItemActiveIngredientsPage }
