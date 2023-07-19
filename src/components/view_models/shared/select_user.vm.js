import { AbstractSelectAutocompleteViewModel } from "./"
import { userApi, userHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper } from "../../../helpers"

class SelectUserViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.getTableDisplayProps = this.getTableDisplayProps.bind(this)
    this.helper = this.helper.bind(this)
    this.modelSearchText = this.modelSearchText.bind(this)
  }

  api() {
    return userApi
  }

  displayModel(model) {
    const modelParts = this.getTableDisplayProps().map(
      (property) => {
        return extractPropertyValue(model, property, this.helper)
      }
    )
    return modelParts.join(' ')

    function extractPropertyValue(model, property, helper) {
      if (!valueHelper.isValue(model)) {
        return ""
      }

      if (valueHelper.isFunction(helper)) {
        if (valueHelper.isFunction(helper()[property])) {
          return helper()[property](model)
        }
      }

      const dotIndex = property.indexOf(".")
      if (dotIndex === -1) {
        return model[property]
      }

      const subProperty = property.substring(0, dotIndex)
      const subModel = model[subProperty]
      return extractPropertyValue(subModel, property.substring(dotIndex + 1))
    }
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_user: searchText
    }

    this.api().search(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), id, onSuccess, onFailure)
  }

  getTableDisplayProps() {
    const { tableDisplayProps } = this.props

    return valueHelper.isValue(tableDisplayProps) ? tableDisplayProps : ["first_name", "last_name", "pharmacist_npi"]
  }

  helper() {
    return userHelper
  }

  modelSearchText(model) {
    return this.helper().fullName(model)
  }
}

export { SelectUserViewModel }
