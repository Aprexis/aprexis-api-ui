import { AbstractListPageViewModel } from '..'
import { dryRunProgramPatientAssignmentApi, pageHelper, pharmacyStoreApi, programApi, valueHelper } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from '../../../../helpers'

const parentMethods = {
  pharmacyStore: {
    parent: pharmacyStoreApi.show,
    dryRunProgramPatientAssignments: dryRunProgramPatientAssignmentApi.listForPharmacyStore
  },
  program: {
    parent: programApi.show,
    dryRunProgramPatientAssignments: dryRunProgramPatientAssignmentApi.listForProgram
  }
}

class DryRunProgramPatientAssignmentsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoDryRunProgramPatientAssignmentProfile = this.gotoDryRunProgramPatientAssignmentProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.parentId = this.parentId.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "patient.last_name,patient.first_name,patient.middle_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions() {
    return []
  }

  filtersOptions() {
    return {}
  }

  gotoDryRunProgramPatientAssignmentProfile(dryRunProgramPatientAssignment) {
    const pathArray = pathHelper.buildPathArray(window.location, dryRunProgramPatientAssignment, "profile")

    pathHelper.gotoPage(pathArray)
  }

  parentId() {
    const pathEntries = this.pathEntries()

    if (valueHelper.isValue(pathEntries["programs"])) {
      return {
        parentType: "program",
        parentId: pathEntries["programs"].value
      }
    }

    return {
      parentType: "pharmacyStore",
      parentId: pathEntries["pharmacy-stores"].value
    }
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("dryRunProgramPatientAssignmentHeaders")
    const apiCredentials = apiEnvironmentHelper.apiEnvironment(userCredentials)
    const { parentType, parentId } = this.parentId()
    const { filters, sorting, page } = this.data

    this.clearData()
    parentMethods[parentType].parent(
      apiCredentials,
      parentId,
      (parent) => {
        parentMethods[parentType].dryRunProgramPatientAssignments(
          apiCredentials,
          parentId,
          { ...filters, ...sorting, page },
          (dryRunProgramPatientAssignments, dryRunProgramPatientAssignmentHeaders) => {
            this.addData(
              {
                page: pageHelper.updatePageFromLastPage(dryRunProgramPatientAssignmentHeaders),
                parentType,
                parent,
                dryRunProgramPatientAssignments
              },
              this.redrawView
            )
          },
          this.onError
        )
      },
      this.onError
    )
  }

  title() {
    return "Patient Search Algorithms"
  }
}

export { DryRunProgramPatientAssignmentsPageViewModel }
