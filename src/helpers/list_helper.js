import React from "react"
import { fieldHelper, valueHelper } from "./"
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
    editTableItem,
    filters,
    gotoTableItemProfile,
    headings,
    helper,
    pathEntries,
    tableItem
  }
) {
  let onProfile
  if (valueHelper.isFunction(gotoTableItemProfile)) {
    onProfile = (event) => { gotoTableItemProfile(tableItem) }
  }

  let onEdit
  if (valueHelper.isFunction(editTableItem)) {
    onEdit = (event) => { editTableItem(tableItem) }
  }

  const row = [
    {
      content: (
        <TableIdentificationColumn
          currentUser={currentUser}
          heading={headings[0]}
          helper={helper}
          onClick={onProfile}
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
