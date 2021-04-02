import React, { Component } from 'react'
import { DashboardPageViewModel } from '../view_models/pages'
import { userHelper, valueHelper } from '../../helpers'

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
}

export { DashboardPage }

