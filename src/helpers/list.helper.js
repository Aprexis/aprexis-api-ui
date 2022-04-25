import React from "react"
import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { TableColumnHeader, TableIdentificationColumn } from "../components/shared"

export const listHelper = {
  listHeader,
  listRow
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
  return headings.filter((heading) => fieldHelper.includeField(pathEntries, filters, heading))
    .map(
      (heading) => {
        const { name, field } = heading

        return (
          <TableColumnHeader
            key={`${listName}-table-heading-${field}`}
            className="aprexis-table-header-cell"
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
          modelName={helper.modelName()}
          onClick={onProfile}
          onDelete={onDelete}
          onEdit={onEdit}
          tableItem={tableItem}
        />
      )
    }
  ]

  headings.filter((heading, idx) => idx > 0 && fieldHelper.includeField(pathEntries, filters, heading))
    .forEach((heading) => { row.push(fieldHelper.listField(helper[heading.method](tableItem))) })

  return row
}
