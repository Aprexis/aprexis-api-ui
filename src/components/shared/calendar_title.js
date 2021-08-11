import React, { Component } from "react"
import { valueHelper } from "../../helpers"

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
