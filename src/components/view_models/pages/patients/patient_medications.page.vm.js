import { AbstractListPageViewModel } from "../"
import { patientApi, patientMedicationApi, pharmacyStoreApi, physicianApi } from "../../../../api"
import {
  filtersHelper,
  pageHelper,
  pathHelper,
  patientHelper,
  patientMedicationHelper,
  pharmacyStoreHelper,
  physicianHelper,
  userCredentialsHelper,
  userHelper,
  valueHelper
} from "../../../../helpers"
import { patientMedications } from "../../../../types"

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

  canCreate() {
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    if (!userHelper.canCreatePatientMedication(currentUser, pathEntries)) {
      return false
    }

    return patientMedicationHelper.canBeCreated(pathEntries)
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")

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
    const pathEntries = this.pathEntries()
    const filters = {}
    const sorting = { sort: "filled_at-,medication.label" }
    const patientId = pathHelper.id(pathEntries, "patients")
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")
    if (valueHelper.isValue(patientId) && valueHelper.isNumberValue(pharmacyStoreId)) {
      filters.for_pharmacy_store = pharmacyStoreId
    }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(patientMedicationToEdit) {
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
      ),
      filtersHelper.dateRangeFilter("Filled At", "for_filled_at_between", { to: new Date() }),
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
