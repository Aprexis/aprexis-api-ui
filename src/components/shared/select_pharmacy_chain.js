import React, { Component } from "react"
import { Col, FormGroup, Input } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { pharmacyChainHelper, valueHelper } from "../../helpers"
import { Autocomplete } from "./"
import { SelectPharmacyChainViewModel } from "../view_models/shared"

const SearchForPharmacyChain = ({ props, state, vm }) => {
  const { readOnly } = props
  const { enableSearch, item, searchText, searchResults } = state
  const label = valueHelper.isValue(item) ? vm.displayModel(item) : ""
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
          sorting={{ sort: "name,state,city" }}
          tableDisplayProps={["name", "state", "city"]}
        />
      }
    </React.Fragment >
  )
}

const SelectPharmacyChainFromList = ({ props, state, vm }) => {
  const { readOnly, targetName } = props
  const { item, models } = state
  let id = pharmacyChainHelper.id(item)
  if (!valueHelper.isNumberValue(id)) {
    id = ""
  }

  let modelOptions
  if (valueHelper.isValue(models)) {
    modelOptions = models.map((model) => modelOption(model, vm.displayModel))
    if (!valueHelper.isValue(item)) {
      modelOptions.push(<option key="pharmacy-chain-none" value=""></option>)
    }
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
          value={id}>
          {modelOptions}
        </Input>
      </Col>
    </FormGroup>
  )

  function modelOption(model, displayModel) {
    return (
      <option
        key={`pharmacy-chain-${pharmacyChainHelper.id(model)}`}
        value={pharmacyChainHelper.id(model)}>
        {displayModel(model)}
      </option>
    )
  }
}

class SelectPharmacyChain extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectPharmacyChainViewModel(
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

  componentDidUpdate() {
    this.vm.updateSearchFromId()
  }

  render() {
    const { useSearch } = this.state

    if (valueHelper.isSet(useSearch)) {
      return (
        <SearchForPharmacyChain
          props={this.props}
          state={this.state}
          vm={this.vm}
        />
      )
    }

    return (
      <SelectPharmacyChainFromList
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

export { SelectPharmacyChain }
