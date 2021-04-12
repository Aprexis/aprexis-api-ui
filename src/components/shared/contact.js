import React, { Component } from 'react'
import { contactHelper, fieldHelper } from '../../helpers'

class Contact extends Component {
  render() {
    const { contactable, prefix } = this.props

    return (
      <React.Fragment>
        {fieldHelper.display("Contact Person", contactHelper.person(contactable, prefix))}
        {fieldHelper.display("Contact Name", contactHelper.name(contactable, prefix))}
        {fieldHelper.display("Contact Info", contactHelper.info(contactable, prefix))}
        {fieldHelper.display("Gender", contactHelper.gender(contactable, prefix))}
        {fieldHelper.display("Phone", contactHelper.phone(contactable, prefix))}
        {fieldHelper.display("Mobile Phone", contactHelper.mobilePhone(contactable, prefix))}
        {fieldHelper.display("Fax", contactHelper.fax(contactable, prefix))}
        {fieldHelper.display("Email", contactHelper.email(contactable, prefix))}
      </React.Fragment>
    )
  }
}

export { Contact }
