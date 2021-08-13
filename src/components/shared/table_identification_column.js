import React, { Component } from "react"
import { valueHelper, fieldHelper } from "../../helpers"
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
    let label = fieldHelper.displayListField(tableItem, helper, heading)
    if (!valueHelper.isStringValue(label)) {
      label = `(Missing ${heading.name})`
    }

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
  }
}

export { TableIdentificationColumn }
