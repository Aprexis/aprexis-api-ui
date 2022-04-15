import React, { Component } from "react"
import { fieldHelper, contactHelper } from "../../helpers"

class Contact extends Component {
  render() {
    const { contactable, prefix } = this.props

    return (
      <React.Fragment>
        {fieldHelper.display("Contact Person", contactHelper.person(contactable, prefix))}
        {fieldHelper.display("Contact Name", contactHelper.name(contactable, prefix))}
        {fieldHelper.display("Contact Info", contactHelper.info(contactable, prefix))}
        {fieldHelper.display("Gender", contactHelper.gender(contactable, prefix))}
        {fieldHelper.phoneDisplay("Phone", contactHelper.phone(contactable, prefix), undefined, contactHelper.phoneExtension(contactable, prefix))}
        {fieldHelper.phoneDisplay("Mobile Phone", contactHelper.mobilePhone(contactable, prefix))}
        {fieldHelper.phoneDisplay("Fax", contactHelper.fax(contactable, prefix))}
        {fieldHelper.display("Email", contactHelper.email(contactable, prefix))}
      </React.Fragment>
    )
  }
}

export { Contact }
