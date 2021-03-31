import React, { Component } from 'react'
import { valueHelper } from '../../helpers'

const RenderSidebarElements = ({ context, currentUser, vm }) => {
  return (
    <div className="py-2 nav-inner w-100">
      <button
        className="rounded-0 btn-sm btn-link w-100 pl-5"
        onClick={vm.gotoUserProfile}>
        Profile
      </button>
    </div>
  )
}

class HealthPlanSidebar extends Component {
  render() {
    return (
      <div className="inner">
        <nav className="btn-toolbar prt-0 mr-0 open vertical">
          <h6
            className="text-uppercase w-100 py-2 pl-4 mr-0 mb-0"
            onClick={this.props.onToggleSidebar}>
            Health Plan
          </h6>
        </nav>

        {
          valueHelper.isSet(this.props.sidebarOpen) &&
          <RenderSidebarElements
            context={this.props.context}
            currentUser={this.props.currentUser}
            vm={this.props.vm}
          />
        }
      </div>
    )
  }
}

export { HealthPlanSidebar }
