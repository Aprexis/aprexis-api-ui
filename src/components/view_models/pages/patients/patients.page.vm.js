import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { healthPlanApi, patientApi, pharmacyStoreApi, pageHelper, patientHelper, pharmacyStoreHelper, valueHelper, healthPlanHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

const patientListMethods = [
  { pathKey: "health-plans", method: patientApi.listForHealthPlan },
  { pathKey: "pharmacy-stores", method: patientApi.listForPharmacyStore }
]

class PatientsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPatientProfile = this.gotoPatientProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return canBeCreated(this.props.currentUser, this.pathEntries(), this.props.context)

    function canBeCreated(user, pathEntries, context) {
      if (!valueHelper.isValue(user) || !valueHelper.isValue(pathEntries) || !valueHelper.isValue(context)) {
        return false
      }

      if (!authorizationHelper.canCreatePatient(user, pathEntries)) {
        return false
      }

      if (!pathHelper.isSingular(pathEntries, "health-plans")) {
        return false
      }

      const healthPlan = context['health-plans']
      return valueHelper.isSet(healthPlanHelper.allowManuallyAddedPatients(healthPlan))
    }

  }

  createModal(_event) {
    const pathEntries = this.pathEntries()
    const healthPlanId = pathHelper.id(pathEntries, "health-plans")

    patientApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      healthPlanId,
      (patient) => {
        this.props.launchModal(
          "patient-profile",
          { operation: "create", onUpdateView: this.refreshData, patient }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "last_name,first_name,middle_name" }
    const pathEntries = this.pathEntries()
    const pharmacyStore = pathEntries["pharmacy-stores"]

    if (valueHelper.isValue(pharmacyStore) && valueHelper.isValue(pharmacyStore.value)) {
      filters.for_pharmacy_store_patient = pharmacyStore.value
    }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(patientToEdit) {
    patientApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientHelper.id(patientToEdit),
      (patient) => {
        this.props.launchModal(
          "patient-profile",
          {
            operation: "update",
            onUpdateView: this.refreshData,
            patient
          }
        )
      },
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
    const filterDescriptions = [
      filtersHelper.stringFilter("Name", "for_name"),
      filtersHelper.stringFilter("Phone Number", "for_phone_number")
    ]
    const pathEntries = this.pathEntries()
    const healthPlan = pathEntries["health-plans"]
    const pharmacyStore = pathEntries["pharmacy-stores"]

    if (!valueHelper.isValue(healthPlan)) {
      filterDescriptions.push(
        filtersHelper.nameIdFilter(
          "Health Plan",
          "for_health_plan",
          {
            fields: ["name", "code"],
            findMethod: healthPlanApi.show,
            minLength: 3,
            otherFilters: {
              ...this.buildFilterFor("for_pharmacy_store_patient", pharmacyStore),
              page: { number: 1, size: 10 }
            },
            searchMethod: healthPlanApi.search,
            searchParam: "for_name",
            sorting: { sort: "name" }
          }
        )
      )
    }

    if (valueHelper.isValue(pharmacyStore)) {
      filterDescriptions.push(
        filtersHelper.selectIdFilter(
          "Only Current",
          "for_pharmacy_store_patient",
          {
            options: [{ id: pharmacyStore.value, value: "Yes" }],
            requireUnselected: true,
            unselectedLabel: "No"
          }
        )
      )
    } else {
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
              ...this.buildFilterFor("for-health-plan", healthPlan),
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

  gotoPatientProfile(patient) {
    const pathArray = pathHelper.buildPathArray(window.location, patient, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("patientHeaders")
    this.fetchList(
      patientListMethods,
      (patients, patientHeaders) => {
        this.addData(
          {
            patients,
            page: pageHelper.updatePageFromLastPage(patientHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Patients"
  }
}

export { PatientsPageViewModel }
