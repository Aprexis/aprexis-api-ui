import { valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "./display.helper"
import { TableColumnHeader, TableIdentificationColumn } from "../components/shared"

export const listHelper = {
  listButton,
  listHeader,
  listRow
}

function listButton(label, target) {
  return (
    <td className='aprexis-table-cell'>
      <button
        className="btn btn-link ml-0 mr-0 pl-0 pr-0 pt-0 pb-0"
        onClick={(_event) => { target() }}
        type="button">
        {label}
      </button>
    </td>
  )
}


function listHeader(
  {
    filters,
    headings,
    listName,
    pathEntries,
    onRefresh,
    onUpdateSorting,
    sorting
  }
) {
  return headings.filter((heading) => displayHelper.includeField(pathEntries, filters, heading))
    .map(
      (heading, headingIndex) => {
        const { name, field } = heading
        let className;
        if (headingIndex == 0) {
          className = 'aprexis-table-header-cell-left'
        } else {
          className = 'aprexis-table-header-cell'
        }

        return (
          <TableColumnHeader
            key={`${listName}-table-heading-${field}`}
            className={className}
            label={name}
            sortFieldName={field}
            sorting={sorting}
            onRefresh={onRefresh}
            onUpdateSorting={onUpdateSorting}
          />
        )
      }
    )
}

function listRow(
  {
    currentUser,
    filters,
    gotoTableItemProfile,
    headings,
    helper,
    launchModal,
    modelName,
    onDeleteTableItem,
    onEditTableItem,
    onRefresh,
    pathEntries,
    tableItem
  }
) {
  let onProfile
  if (valueHelper.isFunction(gotoTableItemProfile)) {
    onProfile = (_event) => { gotoTableItemProfile(tableItem) }
  }

  let onEdit
  if (valueHelper.isFunction(onEditTableItem)) {
    onEdit = (_event) => { onEditTableItem(tableItem) }
  }

  let onDelete
  if (valueHelper.isFunction(onDeleteTableItem)) {
    onDelete = (_event) => { onDeleteTableItem(tableItem, onRefresh) }
  }

  const row = [
    {
      content: (
        <TableIdentificationColumn
          currentUser={currentUser}
          heading={headings[0]}
          helper={helper}
          launchModal={launchModal}
          modelName={modelName}
          onClick={onProfile}
          onDelete={onDelete}
          onEdit={onEdit}
          tableItem={tableItem}
        />
      )
    }
  ]

  headings.filter((heading, idx) => idx > 0 && displayHelper.includeField(pathEntries, filters, heading))
    .forEach((heading) => { row.push(displayHelper.displayListField(tableItem, helper, heading)) })

  return row
}
