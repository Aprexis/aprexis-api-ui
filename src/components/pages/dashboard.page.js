import React, { Component } from 'react'
import { DashboardPageViewModel } from '../view_models/pages'
import { pathHelper } from '../../helpers'

class DashboardPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DashboardPageViewModel(
      {
        pathEntries: pathHelper.parsePathEntries(window.location),
        ...this.props,
        view: this
      }
    )
  }

  render() {
    return (
      <div>
        DASHBOARD PAGE
      </div>
    )
  }
}

export { DashboardPage }

