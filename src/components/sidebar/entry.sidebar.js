import React, { Component } from "react"
import { valueHelper } from "../../helpers"

const RenderSidebarButton = ({ buttonLabel, gotoMethod }) => {
  return (
    <button
      className="rounded-0 btn-sm btn-link w-100 pl-5"
      onClick={(event) => { gotoMethod() }}>
      {buttonLabel}
    </button>
  )
}

const RenderSidebarListButton = ({ buttonDescription, gotoList, pathPrefixArray }) => {
  const { buttonLabel, listName } = buttonDescription

  return (
    <RenderSidebarButton
      buttonLabel={buttonLabel}
      gotoMethod={() => { gotoList(pathPrefixArray, listName) }}
    />
  )
}

const RenderSidebarPageButton = ({ buttonDescription, gotoPage, pathPrefixArray }) => {
  const { buttonLabel, pageName } = buttonDescription

  return (
    <RenderSidebarButton
      buttonLabel={buttonLabel}
      gotoMethod={() => { gotoPage(pathPrefixArray, pageName) }}
    />
  )
}

const RenderSidebarProfileButton = ({ gotoProfile, pathPrefixArray }) => {
  return (
    <RenderSidebarButton
      buttonLabel="Profile"
      gotoMethod={() => { gotoProfile(pathPrefixArray) }}
    />
  )
}

const RenderSidebarElements = ({ entryDescription, gotoList, gotoPage, gotoProfile, pathPrefixArray, sidebarOpen }) => {
  if (!valueHelper.isSet(sidebarOpen)) {
    return (<React.Fragment />)
  }

  return (
    <div className="py-2 nav-inner w-100">
      {renderEntryButtons(entryDescription, gotoList, gotoPage, gotoProfile, pathPrefixArray)}
    </div>
  )

  function renderEntryButtons(entryDescription, gotoList, gotoPage, gotoProfile, pathPrefixArray) {
    const { entryName, entryButtons } = entryDescription

    return entryButtons.map(
      (buttonDescription) => {
        const { buttonType } = buttonDescription

        switch (buttonType.toLowerCase()) {
          case 'list':
            return (
              <RenderSidebarListButton
                buttonDescription={buttonDescription}
                gotoList={gotoList}
                key={`sidebar-${entryName}-list-${buttonDescription.listName}`}
                pathPrefixArray={pathPrefixArray}
              />
            )

          case 'page':
            return (
              <RenderSidebarPageButton
                buttonDescription={buttonDescription}
                gotoPage={gotoPage}
                key={`sidebar-${entryName}-page-${buttonDescription.apgeName}`}
                pathPrefixArray={pathPrefixArray}
              />
            )

          case 'profile':
            return (
              <RenderSidebarProfileButton
                gotoProfile={gotoProfile}
                key={`sidebar-${entryName}-profile`}
                pathPrefixArray={pathPrefixArray}
              />
            )

          default:
            return (<React.Fragment />)
        }
      }
    )
  }
}

class EntrySidebar extends Component {
  render() {
    const { entryDescription } = this.props
    const { entryLabel } = entryDescription

    return (
      <div className="inner">
        <nav className="btn-toolbar prt-0 mr-0 open vertical">
          <h6
            className="text-uppercase w-100 py-2 pl-4 mr-0 mb-0"
            onClick={this.props.onToggleSidebar}>
            {entryLabel}
          </h6>
        </nav>

        <RenderSidebarElements {...this.props} />
      </div>
    )
  }
}

export { EntrySidebar }
