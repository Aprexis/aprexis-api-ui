import React, { Component } from "react"
import { Col, FormGroup, Input } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { pharmacyStoreHelper, valueHelper } from "../../helpers"
import { Autocomplete } from "./"
import { SelectPharmacyStoreViewModel } from "../view_models/shared"

const SearchForPharmacyStore = ({ props, state, vm }) => {
  const { readOnly } = props
  const { enableSearch, item, searchText, searchResults } = state
  const label = valueHelper.isValue(item) ? this.vm.displayModel(item) : ""
  const rowClassName = valueHelper.isSet(enableSearch) ? "mb-0 pb-0" : ""

  return (
    <React.Fragment>
      <FormGroup row className={rowClassName} style={{ width: "100%" }}>
        <Col xs={2}><label>{props.fieldLabel}</label></Col>
        <Col xs={9}>
          <label>{label}</label>
        </Col>
        {
          !valueHelper.isSet(readOnly) &&
          <Col xs={1}>
            <button
              className="mt-0 mb-0 pt-0 pb-0 mr-auto btn btn-mobile"
              disabled={readOnly}
              onClick={vm.toggleSearch}
              readOnly={readOnly}
              type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </Col>
        }
      </FormGroup>
      {
        valueHelper.isSet(enableSearch) && !valueHelper.isSet(readOnly) &&
        <Autocomplete
          clearFunction={vm.clearSearch}
          filters={props.baseFilters}
          inForm={props.inForm}
          inputName={props.fieldLabel}
          inputPlaceholder={props.fieldLabel.toLowerCase()}
          item={item}
          onOptionSelect={vm.select}
          options={searchResults}
          searchFunction={vm.search}
          searchMinLength={props.minLength ?? 3}
          searchText={searchText}
          sorting={{ sort: "name,store_number" }}
          tableDisplayProps={["store", "pharmacy.name"]}
        />
      }
    </React.Fragment >
  )
}

const SelectPharmacyStoreFromList = ({ props, state, vm }) => {
  const { readOnly, targetName } = props
  const { item, models } = state
  let modelOptions
  if (valueHelper.isValue(models)) {
    modelOptions = models.map((model) => modelOption(model, vm.displayModel))
  }

  return (
    <FormGroup row style={{ width: "100%" }}>
      <Col xs={2}><label>{props.fieldLabel}</label></Col>
      <Col xs={9}>
        <Input
          bsSize="sm"
          disabled={valueHelper.isSet(readOnly)}
          name={targetName}
          onChange={vm.selectEvent}
          readOnly={readOnly}
          type="select"
          value={pharmacyStoreHelper.id(item)}>
          {modelOptions}
        </Input>
      </Col>
    </FormGroup>
  )

  function modelOption(model, displayModel) {
    return (
      <option
        key={`pharmacy-store-${pharmacyStoreHelper.id(model)}`}
        id={pharmacyStoreHelper.id(model)}>
        {displayModel(model)}
      </option>
    )
  }
}

class SelectPharmacyStore extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectPharmacyStoreViewModel(
      {
        ...props,
        view: this
      }
    )
    this.state = {}
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { useSearch } = this.state

    if (valueHelper.isSet(useSearch)) {
      return (
        <SearchForPharmacyStore
          props={this.props}
          state={this.state}
          vm={this.vm}
        />
      )
    }

    return (
      <SelectPharmacyStoreFromList
        props={this.props}
        state={this.state}
        vm={this.vm}
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SelectPharmacyStore }
