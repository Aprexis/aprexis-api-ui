import { AbstractListPageViewModel } from "../"
import { patientApi, patientMedicationApi, pharmacyStoreApi } from "../../../../api"
import {
  filtersHelper,
  pageHelper,
  pathHelper,
  patientMedicationHelper,
  pharmacyStoreHelper,
  userCredentialsHelper,
  userHelper,
  valueHelper
} from "../../../../helpers"

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
    this.gotoPatientMedicationProfile = this.gotoPatientMedicationProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  canCreate(event) {
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    if (!userHelper.canCreatePatientMedication(currentUser, pathEntries)) {
      return false
    }

    return patientMedicationHelper.canBeCreated(pathEntries)
  }

  createModal(event) {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy_stores")

    patientMedicationApi.buildNew(
      userCredentialsHelper.get(),
      patientId,
      pharmacyStoreId,
      (patientMedication) => {
        this.addField("modal", { modalName: "patient-medication", operation: "create", patientMedication })
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "filled_at-,label" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(event, patientMedicationToEdit) {
    patientMedicationApi.edit(
      userCredentialsHelper.get(),
      patientMedicationToEdit.id,
      (patientMedication) => {
        this.addField("modal", { modalName: "patient-medication", operation: "update", patientMedication })
      },
      this.onError
    )
  }

  filterDescriptions(filters, filtersOptions) {
    const filterDescriptions = [
      filtersHelper.dateRangeFilter("Filled At", "for_filled_at_between", { to: new Date() })
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

  gotoPatientMedicationProfile(patient_medication) {
    const pathArray = pathHelper.buildPathArray(window.location, patient_medication, "profile")

    pathHelper.gotoPage(pathArray)
  }

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
        this.addData({ patientMedications })
        this.addField("page", pageHelper.updatePageFromLastPage(patientMedicationHeaders))
        this.redrawView()
      },
      this.onError
    )
  }
}

export { PatientMedicationsPageViewModel }
