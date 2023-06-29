import React, { Component } from "react"
import { Col } from "reactstrap"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { EntrySidebar } from "./"
import { SidebarViewModel } from "../view_models/sidebar"

const sidebarDescriptions = {
  "answers": {
    entryButtons: [],
    entryLabel: "Answer",
    entryName: "answers"
  },
  "appointments": {
    entryButtons: [],
    entryLabel: "Appointment",
    entryName: "appointments"
  },
  "batches": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Batch",
    entryName: "batches"
  },
  "billing-claims": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Claim",
    entryName: "billing-claims"
  },
  "billing-contract-pharmacies": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Contract Pharmacy Chain",
    entryName: "billing-contract-pharmacies"
  },
  "billing-contract-pharmacy-stores": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Contract Pharmacy Store",
    entryName: "billing-contract-pharmacy-stores"
  },
  "billing-contract-terms": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Contract Term",
    entryName: "billing-contract-terms"
  },
  "billing-contracts": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Pharmacy Chains", buttonType: "List", listName: "billing-contract-pharmacies" },
      { buttonLabel: "Pharmacy Stores", buttonType: "List", listName: "billing-contract-pharmacy-stores" },
      { buttonLabel: "Terms", buttonType: "List", listName: "billing-contract-terms" }
    ],
    entryLabel: "Contract",
    entryName: "billing-contracts"
  },
  "caregivers": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Caregriver",
    entryName: "caregivers"
  },
  "diagnosis-codes": {
    entryButtons: [{ buttonType: "Profile" }],
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
  "documents": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Document",
    entryName: "documents"
  },
  "faxes": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Fax",
    entryName: "fax"
  },
  "health-plans": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Claims", buttonType: "List", listName: "billing-claims" },
      { buttonLabel: "Contracts", buttonType: "List", listName: "billing-contracts" },
      { buttonLabel: "Documents", buttonType: "List", listName: "documents" },
      { buttonLabel: "Patients", buttonType: "List", listName: "patients" },
      { buttonLabel: "Patient Search Algorithms", buttonType: "List", listName: "patient-search-algorithms" },
      { buttonLabel: "Programs", buttonType: "List", listName: "programs" },
      { buttonLabel: "Program Limits", buttonType: "list", listName: "health-plan-program-limits" },
      { buttonLabel: "Users", buttonType: "List", listName: "users" }
    ],
    entryLabel: "Health Plan",
    entryName: "health-plans"
  },
  "health-plan-program-limits": {
    entryButtons: [],
    entryLabel: "Program Limit",
    entryName: "health-plan-program-limits"
  },
  "intervention-documents": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Documents",
    entryName: "intervention-documents"
  },
  "intervention-medications": {
    entryButtons: [],
    entryLabel: "Medications",
    entryName: "intervention-medications"
  },
  "interventions": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Answers", buttonType: "List", listName: "answers" },
      { buttonLabel: "Documents", buttonType: "List", listName: "intervention-documents" },
      { buttonLabel: "Faxes", buttonType: "List", listName: "faxes" },
      { buttonLabel: "Lab Test Values", buttonType: "List", listName: "lab-test-values" },
      { buttonLabel: "Medications", buttonType: "List", listName: "intervention-medications" }
    ],
    entryLabel: "Intervention",
    entryName: "interventions"
  },
  "lab-tests": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Lab Test",
    entryName: "lab-tests"
  },
  "lab-test-values": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Lab Test Value",
    entryName: "lab-test-values"
  },
  "medical-claims": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Medical Claim",
    entryName: "medical-claims"
  },
  "medications": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Medication",
    entryName: "medications"
  },
  "patients": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Allergies", buttonType: "List", listName: "patient-allergies" },
      { buttonLabel: "Caregivers", buttonType: "List", listName: "caregivers" },
      { buttonLabel: "Diseases", buttonType: "List", listName: "patient-diseases" },
      { buttonLabel: "Insurance Detail", buttonType: "Page", pageName: "patient-health-plan-insurance-details/profile-for-patient" },
      { buttonLabel: "Interventions", buttonType: "List", listName: "interventions" },
      { buttonLabel: "Lab Test Values", buttonType: "List", listName: "lab-test-values" },
      { buttonLabel: "Medical Claims", buttonType: "List", listName: "medical-claims" },
      { buttonLabel: "Medications", buttonType: "List", listName: "patient-medications" },
      { buttonLabel: "Notes", buttonType: "List", listName: "patient-notes" },
      { buttonLabel: "Pharmacy Claims", buttonType: "List", listName: "pharmacy-claims" },
      { buttonLabel: "HCPs", buttonType: "List", listName: "patient-physicians" },
      { buttonLabel: "Reminders", buttonType: "List", listName: "reminders" },
      { buttonLabel: "Supplements", buttonType: "List", listName: "patient-supplements" }
    ],
    entryLabel: "Patient",
    entryName: "patients"
  },
  "patient-allergies": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Allergy",
    entryName: "patient-allergies"
  },
  "patient-diseases": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Disease",
    entryName: "patient-diseases"
  },
  "patient-medications": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Medication",
    entryName: "patient-medications"
  },
  "patient-notes": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Note",
    entryName: "patient-notes"
  },
  "patient-physicians": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "HCP",
    entryName: "patient-physicians"
  },
  "patient-search-algorithms": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Patient Search Algorithm",
    entryName: "patient-search-algorithms"
  },
  "patient-supplements": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Supplement",
    entryName: "patient-supplements"
  },
  "pharmacy-chains": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Pharmacy Stores", buttonType: "List", listName: "pharmacy-stores" }
    ],
    entryLabel: "Pharmacy Chain",
    entryName: "pharmacy-chains"
  },
  "pharmacy-claims": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Pharmacy Claim",
    entryName: "pharmacy-claims"
  },
  "pharmacy-stores": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonLabel: "Claims", buttonType: "List", listName: "billing-claims" },
      { buttonLabel: "Patients", buttonType: "List", listName: "patients" },
      { buttonLabel: "Interventions", buttonType: "List", listName: "interventions" }
    ],
    entryLabel: "Pharmacy Store",
    entryName: "pharmacy-stores"
  },
  "physicians": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "HCPs",
    entryName: "physicians"
  },
  "programs": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Program",
    entryName: "programs"
  },
  "reminders": {
    entryButtons: [{ buttonType: "Profile" }],
    entryLabel: "Reminder",
    entryName: "reminders"
  },
  "users": {
    entryButtons: [
      { buttonType: "Profile" },
      { buttonIf: "canCreate", buttonLabel: "Appointments", buttonType: "List", listName: "appointments" }
    ],
    entryLabel: "User",
    entryName: "users"
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
        canCreate={this.vm.canCreate}
        context={context}
        currentUser={currentUser}
        entryDescription={entryDescription}
        gotoList={this.vm.gotoList}
        gotoPage={this.vm.gotoPage}
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
    return (_event) => { this.toggleSidebar(sidebarIndex) }
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }

  toggleSidebar(sidebarIndex) {
    const { selectedIndex } = this.state

    if (sidebarIndex !== selectedIndex) {
      this.setState({ selectedIndex: sidebarIndex })
    }
  }
}

export { Sidebar }
