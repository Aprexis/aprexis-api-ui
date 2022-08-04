import React, { Component } from "react"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../helpers"
import { DeleteButton, EditButton } from "./"

class TableIdentificationColumn extends Component {
  render() {
    const {
      currentUser,
      heading,
      helper,
      launchModal,
      onClick,
      onDelete,
      onEdit,
      modelName,
      tableItem
    } = this.props
    let className = "mt-0 mb-0 pt-0 pb-0"
    if (valueHelper.isFunction(onClick)) {
      className = `${className} btn-link`
    }
    const label = labelField(tableItem, helper, heading)

    return (
      <React.Fragment>
        <label className={className} onClick={onClick}>
          {label}
        </label>
        {
          helper.canEdit(currentUser, tableItem) && valueHelper.isFunction(onEdit) &&
          <EditButton onEdit={onEdit} />
        }
        {
          helper.canDelete(currentUser, tableItem) && valueHelper.isFunction(onDelete) &&
          <DeleteButton
            launchModal={launchModal}
            onDelete={onDelete}
            modelName={modelName}
          />
        }
      </React.Fragment>
    )

    function labelField(tableItem, helper, heading) {
      if (valueHelper.isStringValue(heading.labelMethod)) {
        return helper[heading.labelMethod](tableItem)
      }

      let label = displayHelper.displayListField(tableItem, helper, heading)
      if (!valueHelper.isStringValue(label)) {
        label = `(Missing ${heading.name})`
      }
      return label
    }
  }
}

export { TableIdentificationColumn }
