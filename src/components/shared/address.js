import React, { Component } from 'react'
import { addressHelper, fieldHelper } from '../../helpers'

class Address extends Component {
  render() {
    const { addressable, prefix } = this.props

    return (
      <React.Fragment>
        {fieldHelper.display("Address", addressHelper.address(addressable, prefix))}
        {fieldHelper.display("City", addressHelper.city(addressable, prefix))}
        {fieldHelper.display("State", addressHelper.state(addressable, prefix))}
        {fieldHelper.display("ZIP Code", addressHelper.zipCode(addressable, prefix))}
        {fieldHelper.display("Country", addressHelper.country(addressable, prefix))}
      </React.Fragment>
    )
  }
}

export { Address }
