import React, { Component } from "react"
import { Col } from "reactstrap"
import { EntrySidebar } from "./"
import { SidebarViewModel } from "../view_models/sidebar"
import { valueHelper } from "../../helpers"

const sidebarDescriptions = {
  "answers": {
    entryButtons: [
    ],
    entryLabel: "Answer",
    entryName: "answers"
  },
  "diagnosis-codes": {
    entryButtons: [
      { buttonType: "Profile" }
    ],
    entryLabel: "Diagnosis Code",
    entryName: "diagnosis-codes"
  },
  "diseases": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Diagnosis Codes", buttonType: "List", listName: "diagnosis-codes" }
    ],
    entryLabel: "Disease",
    entryName: "diseases"
  },
  "health-plans": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Patients", buttonType: "List", listName: "patients" },
      { buttonLabel: "Programs", buttonType: "List", listName: "programs" },
      { buttonLabel: "Patient Search Algorithms", buttonType: "List", listName: "patient-search-algorithms" }
    ],
    entryLabel: "Health Plan",
    entryName: "health-plans"
  },
  "interventions": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Answers", buttonType: "List", listName: "answers" }
    ],
    entryLabel: "Intervention",
    entryName: "interventions"
  },
  "lab-tests": {
    entryButtons: [
      { buttonType: "Profile" }
    ],
    entryLabel: "Lab Test",
    entryName: "lab-tests"
  },
  "patients": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Interventions", buttonType: "List", listName: "interventions" }
    ],
    entryLabel: "Patient",
    entryName: "patients"
  },
  "pharmacy-chains": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Pharmacy Stores", buttonType: "List", listName: "pharmacy-stores" }
    ],
    entryLabel: "Pharmacy Chain",
    entryName: "pharmacy-chains"
  },
  "pharmacy-stores": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Interventions", buttonType: "List", listName: "interventions" }
    ],
    entryLabel: "Pharmacy Store",
    entryName: "pharmacy-stores"
  },
  "programs": {
    entryButtons: [
      { buttonType: "Profile" }
    ],
    entryLabel: "Program",
    entryName: "programs"
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: -1,
      lastPathEntries: []
    }
    this.vm = new SidebarViewModel(
      {
        ...props,
        view: this
      }
    )

    this.buildSidebarComponent = this.buildSidebarComponent.bind(this)
    this.buildSidebarComponents = this.buildSidebarComponents.bind(this)
    this.checkAgainstLast = this.checkAgainstLast.bind(this)
    this.determineSelected = this.determineSelected.bind(this)
    this.selectSidebar = this.selectSidebar.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  buildSidebarComponent(context, currentUser, sidebarIndex, selectedIndex, pathEntry, pathPrefixArray) {
    const entryDescription = sidebarDescriptions[pathEntry.key]
    if (!valueHelper.isValue(entryDescription)) {
      throw new Error(`Cannot find sidebar component for ${pathEntry.key}`)
    }

    return (
      <EntrySidebar
        context={context}
        currentUser={currentUser}
        entryDescription={entryDescription}
        gotoList={this.vm.gotoList}
        gotoProfile={this.vm.gotoProfile}
        key={`sidebar-entry-${pathEntry.key}`}
        pathPrefixArray={pathPrefixArray}
        sidebarOpen={sidebarIndex === selectedIndex}
        onToggleSidebar={this.selectSidebar(sidebarIndex)}
      />
    )
  }

  buildSidebarComponents() {
    const { context, currentUser } = this.props
    const { selectedIndex } = this.state
    const orderedPathEntries = this.vm.orderedPathEntries()
    const sidebarComponents = []
    let pathPrefixArray = []

    for (let pathEntryIdx = 0; pathEntryIdx < orderedPathEntries.length; ++pathEntryIdx) {
      const pathEntry = orderedPathEntries[pathEntryIdx]
      pathPrefixArray.push(pathEntry.key)

      if (!valueHelper.isValue(pathEntry.value) || isNaN(pathEntry.value)) {
        continue
      }

      pathPrefixArray.push(pathEntry.value)
      sidebarComponents.push(
        this.buildSidebarComponent(
          context,
          currentUser,
          pathEntryIdx,
          selectedIndex,
          pathEntry,
          [...pathPrefixArray]
        )
      )
    }

    return sidebarComponents
  }

  checkAgainstLast(lastSelectedIndex, lastPathEntries, selectedIndex, pathEntries) {
    if (selectedIndex !== lastSelectedIndex) {
      return false
    }

    if (!Array.isArray(pathEntries) || !Array.isArray(lastPathEntries)) {
      return false
    }

    if (pathEntries.length !== lastPathEntries.length) {
      return false
    }

    return !valueHelper.isValue(
      pathEntries.find(
        (pathEntry, pathEntryIdx) => {
          const lastPathEntry = lastPathEntries[pathEntryIdx]

          return pathEntry.key != lastPathEntry.key || pathEntry.value != lastPathEntry.value
        }
      )
    )
  }

  componentDidMount() {
    const { selectedIndex, lastPathEntries } = this.determineSelected()
    this.setState({ selectedIndex, lastPathEntries })
  }

  componentDidUpdate() {
    const { selectedIndex, lastPathEntries } = this.determineSelected()

    if (!this.checkAgainstLast(this.state.selectedIndex, this.state.lastPathEntries, selectedIndex, lastPathEntries)) {
      this.setState({ selectedIndex, lastPathEntries })
    }
  }

  determineSelected() {
    const orderedPathEntries = this.vm.orderedPathEntries()
    let { selectedIndex, lastPathEntries } = this.state

    if ((selectedIndex === -1) || !this.checkAgainstLast(selectedIndex, lastPathEntries, selectedIndex, orderedPathEntries)) {
      lastPathEntries = orderedPathEntries
      for (selectedIndex = orderedPathEntries.length - 1; selectedIndex >= 0; --selectedIndex) {
        if (valueHelper.isValue(orderedPathEntries[selectedIndex].value)) {
          break
        }
      }

      if (selectedIndex === orderedPathEntries.length) {
        --selectedIndex
      }
    }

    return { selectedIndex, lastPathEntries }
  }

  render() {
    const sidebarComponents = this.buildSidebarComponents()

    return (
      <Col sm="2" className="sidebar-nav p-0 m-0">
        {sidebarComponents}
      </Col>
    )
  }

  selectSidebar(sidebarIndex) {
    return (event) => { this.toggleSidebar(sidebarIndex) }
  }

  toggleSidebar(sidebarIndex) {
    const { selectedIndex } = this.state

    if (sidebarIndex !== selectedIndex) {
      this.setState({ selectedIndex: sidebarIndex })
    }
  }
}

export { Sidebar }
