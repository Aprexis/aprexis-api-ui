import { AbstractListPageViewModel } from "../"
import { patientApi, patientNoteApi, pharmacyStoreApi, pageHelper, patientHelper, pharmacyStoreHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const patientNoteListMethods = [
  { pathKey: "patients", method: patientNoteApi.listForPatient }
]

class PatientNotesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoPatientNoteProfile = this.gotoPatientNoteProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate(_event) {
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    return canBeCreated(currentUser, pathEntries)

    function canBeCreated(currentUser, pathEntries) {
      if (!authorizationHelper.canCreatePatientNote(currentUser, pathEntries)) {
        return false
      }

      return pathHelper.isSingular(pathEntries, "patients") && pathHelper.isSingular(pathEntries, "pharmacy-stores")
    }
  }

  createModal(_event) {
    const pathEntries = this.pathEntries()
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")
    const patientId = pathHelper.id(pathEntries, "patients")

    patientNoteApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
      pharmacyStoreId,
      (patientNote) => {
        this.props.launchModal(
          "patient-note",
          { operation: "create", onUpdateView: this.refreshData, patientNote }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "updated_at-" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    const filterDescriptions = [
      filtersHelper.dateTimeRangeFilter("Date/Time", "for_updated_at_between", { to: new Date() })
    ]
    const pathEntries = this.pathEntries()
    const healthPlan = pathEntries["health-plans"]
    const patient = pathEntries["patients"]
    const pharmacyStore = pathEntries["pharmacy-stores"]

    if (!valueHelper.isValue(patient)) {
      filterDescriptions.push(
        filtersHelper.nameIdFilter(
          "Patient",
          "for_patient",
          {
            fields: ["name", "date_of_birth", "health_plan_name"],
            findMethod: patientApi.show,
            labelMethod: patientHelper.name,
            minLength: 3,
            otherFilters: {
              ...this.buildFilterFor("for_health_plan", healthPlan),
              ...this.buildFilterFor("for_pharmacy_store", pharmacyStore),
              page: { number: 1, size: 10 }
            },
            searchMethod: patientApi.search,
            searchParam: "for_name",
            sorting: { sort: "last_name,first_name,middle_name" }
          }
        )
      )
    }

    if (!valueHelper.isValue(pharmacyStore)) {
      // Limit by pharmacy if in path
      filterDescriptions.push(
        filtersHelper.nameIdFilter(
          "Pharmacy Store",
          "for_pharmacy_store",
          {
            fields: ["store", "pharmacy.name"],
            findMethod: pharmacyStoreApi.show,
            labelMethod: pharmacyStoreHelper.identification,
            minLength: 3,
            otherFilters: {
              ...this.buildFilterFor("for_health_plan", healthPlan),
              ...this.buildFilterFor("for_patient", patient),
              page: { number: 1, size: 10 }
            },
            searchMethod: pharmacyStoreApi.search,
            searchParam: "for_store",
            sorting: { sort: "name,store_number,id" }
          }
        )
      )
    }

    return filterDescriptions
  }

  filtersOptions() {
    return {}
  }

  /* TODO: enable once the page is implemented.
  gotoPatientNoteProfile(patient_note) {
    const pathArray = pathHelper.buildPathArray(window.location, patient_note, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("patientNoteHeaders")
    this.fetchList(
      patientNoteListMethods,
      (patientNotes, patientNoteHeaders) => {
        this.addData(
          { patientNotes, "page": pageHelper.updatePageFromLastPage(patientNoteHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Patient Notes"
  }
}

export { PatientNotesPageViewModel }
