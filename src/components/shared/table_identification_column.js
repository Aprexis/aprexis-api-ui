import React, { Component } from "react"
import { EditButton } from "./"
import { fieldHelper } from "../../helpers"

class TableIdentificationColumn extends Component {
  render() {
    const { currentUser, heading, helper, onClick, onEdit, tableItem } = this.props

    return (
      <React.Fragment>
        <label className="mt-0 mb-0 pt-0 pb-0" onClick={onClick}>
          {fieldHelper.displayListField(tableItem, helper, heading)}
        </label>
        {
          helper.canEdit(currentUser, tableItem) &&
          <EditButton onEdit={onEdit} />
        }
      </React.Fragment>
    )
  }
}

export { TableIdentificationColumn }
