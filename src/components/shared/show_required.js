import React, { Component } from "react"
import { valueHelper } from "@aprexis/aprexis-api-utility"

class ShowRequired extends Component {
  render() {
    const { required } = this.props
    if (!valueHelper.isSet(required)) {
      return (<React.Fragment />)
    }

    return (
      <span style={{ color: "red" }}>&nbsp;*</span>
    )
  }
}

export { ShowRequired }
