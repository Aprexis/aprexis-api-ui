import { AbstractListPageViewModel } from "../"
import { patientApi, patientMedicationApi, pharmacyStoreApi, physicianApi, pageHelper, patientHelper, pharmacyStoreHelper, physicianHelper, valueHelper, patientMedications } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const patientMedicationListMethods = [
  { pathKey: "patients", method: patientMedicationApi.listForPatient }
]

class PatientMedicationsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoPatientMedicationProfile = this.gotoPatientMedicationProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    return canBeCreated(currentUser, pathEntries)

    function canBeCreated(user, pathEntries) {
      if (!authorizationHelper.canCreatePatientMedication(user, pathEntries)) {
        return false
      }

      return pathHelper.isSingular(pathEntries, "patients")
    }
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")

    patientMedicationApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
      pharmacyStoreId,
      (patientMedication) => {
        this.props.launchModal(
          "patient-medication",
          { operation: "create", onUpdateView: this.refreshData, patientMedication }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "medication.label" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(patientMedicationToEdit) {
    patientMedicationApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientMedicationToEdit.id,
      (patientMedication) => {
        this.props.launchModal(
          "patient-medication",
          { operation: "update", onUpdateView: this.refreshData, patientMedication })
      },
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
    const pathEntries = this.pathEntries()
    const healthPlan = pathEntries["health-plans"]
    const patient = pathEntries["patients"]
    const pharmacyStore = pathEntries["pharmacy-stores"]
    const filterDescriptions = [
      filtersHelper.selectIdFilter(
        "Type",
        "for_type",
        {
          options: Object.keys(patientMedications).map(
            (id) => {
              const value = patientMedications[id]
              return { id, value }
            }
          ),
          requireUnselected: true,
          unselectedLabel: "All"
        }
      ),
      filtersHelper.nameIdFilter(
        "Physician",
        "for_physician",
        {
          fields: ["name", "npi", "city", "state"],
          findMethod: physicianApi.show,
          labelMethod: physicianHelper.name,
          minLength: 3,
          otherFilters: {
            ...this.buildFilterFor("for_patient", patient),
            page: { number: 1, size: 10 }
          },
          searchMethod: physicianApi.search,
          searchParam: "for_physician",
          sorting: { sort: "last_name,first_name,middle_name,npi,city,state" }
        }
      )
    ]

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

  /* TODO: enable once the page is written.
  gotoPatientMedicationProfile(patient_medication) {
    const pathArray = pathHelper.buildPathArray(window.location, patient_medication, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("patientMedicationHeaders")
    this.fetchList(
      patientMedicationListMethods,
      (patientMedications, patientMedicationHeaders) => {
        this.addData(
          { patientMedications, page: pageHelper.updatePageFromLastPage(patientMedicationHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Patient Medications"
  }
}

export { PatientMedicationsPageViewModel }
