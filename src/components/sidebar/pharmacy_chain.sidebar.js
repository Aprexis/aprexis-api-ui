import React, { Component } from "react"
import { valueHelper } from "../../helpers"

const RenderSidebarElements = ({ pathPrefixArray, sidebarOpen, vm }) => {
  if (!valueHelper.isSet(sidebarOpen)) {
    return (<React.Fragment />)
  }

  return (
    <div className="py-2 nav-inner w-100">
      <button
        className="rounded-0 btn-sm btn-link w-100 pl-5"
        onClick={(event) => { vm.gotoProfile(pathPrefixArray) }}>
        Profile
      </button>

      <button
        className="rounded-0 btn-sm btn-link w-100 pl-5"
        onClick={(event) => { vm.gotoPharmacyStores(pathPrefixArray) }}>
        Pharmacy Stores
      </button>
    </div>
  )
}

class PharmacyChainSidebar extends Component {
  render() {
    return (
      <div className="inner">
        <nav className="btn-toolbar prt-0 mr-0 open vertical">
          <h6
            className="text-uppercase w-100 py-2 pl-4 mr-0 mb-0"
            onClick={this.props.onToggleSidebar}>
            Pharmacy Chain
          </h6>
        </nav>

        <RenderSidebarElements
          pathPrefixArray={this.props.pathPrefixArray}
          sidebarOpen={this.props.sidebarOpen}
          vm={this.props.vm}
        />
      </div>
    )
  }
}

export { PharmacyChainSidebar }
