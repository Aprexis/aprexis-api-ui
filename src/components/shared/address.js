import React, { Component } from "react"
import { addressHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from '../../helpers/index.js'

class Address extends Component {
  render() {
    const { addressable, prefix } = this.props

    return (
      <React.Fragment>
        {displayHelper.display("Address", addressHelper.address(addressable, prefix))}
        {displayHelper.display("City", addressHelper.city(addressable, prefix))}
        {displayHelper.display("State", addressHelper.state(addressable, prefix))}
        {displayHelper.display("ZIP Code", addressHelper.zipCode(addressable, prefix))}
        {displayHelper.display("Country", addressHelper.country(addressable, prefix))}
      </React.Fragment>
    )
  }
}

export { Address }
