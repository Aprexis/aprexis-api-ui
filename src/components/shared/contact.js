import React, { Component } from "react"
import { contactHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from '../../helpers'

class Contact extends Component {
  render() {
    const { contactable, prefix } = this.props

    return (
      <React.Fragment>
        {displayHelper.display("Contact Person", contactHelper.person(contactable, prefix))}
        {displayHelper.display("Contact Name", contactHelper.name(contactable, prefix))}
        {displayHelper.display("Contact Info", contactHelper.info(contactable, prefix))}
        {displayHelper.display("Gender", contactHelper.gender(contactable, prefix))}
        {displayHelper.phoneDisplay("Phone", contactHelper.phone(contactable, prefix), undefined, contactHelper.phoneExtension(contactable, prefix))}
        {displayHelper.phoneDisplay("Mobile Phone", contactHelper.mobilePhone(contactable, prefix))}
        {displayHelper.phoneDisplay("Fax", contactHelper.fax(contactable, prefix))}
        {displayHelper.display("Email", contactHelper.email(contactable, prefix))}
      </React.Fragment>
    )
  }
}

export { Contact }
