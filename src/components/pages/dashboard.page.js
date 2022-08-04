import React, { Component } from 'react'
import { DashboardPageViewModel } from '../view_models/pages'
import { userHelper, valueHelper } from '@aprexis/aprexis-api-utility'

class DashboardPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DashboardPageViewModel(
      {
        ...props,
        view: this
      }
    )
  }

  render() {
    const { currentUser } = this.props
    let name = 'No current user'
    if (valueHelper.isValue(currentUser)) {
      name = userHelper.fullName(currentUser)
    }

    return (
      <div>
        Dashboard for {name}
      </div>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { DashboardPage }

