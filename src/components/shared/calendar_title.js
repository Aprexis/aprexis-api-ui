import React, { Component } from "react"
import { valueHelper } from "@aprexis/aprexis-api-utility"

class CalendarTitle extends Component {
  render() {
    const { title } = this.props
    if (!valueHelper.isStringValue(title)) {
      return (<React.Fragment />)
    }

    return (<caption>{title}</caption>)
  }
}

export { CalendarTitle }
