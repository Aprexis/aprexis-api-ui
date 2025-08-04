import React, { Component } from "react"
import { Col, FormGroup, Input } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { valueHelper, billingContractHelper } from "@aprexis/aprexis-api-utility"
import { Autocomplete } from './autocomplete.js'
import { ShowRequired } from "./show_required.js"
import { SelectBillingContractViewModel } from "../view_models/shared/index.js"

const SearchForBillingContract = ({ props, state, vm }) => {
  const { readOnly, required } = props
  const { enableSearch, item, searchText, searchResults } = state
  const label = valueHelper.isValue(item) ? vm.displayModel(item) : ""
  const rowClassName = valueHelper.isSet(enableSearch) ? "mb-0 pb-0" : ""

  return (
    <React.Fragment>
      <FormGroup row className={rowClassName} style={{ width: "100%" }}>
        <Col xs={2}><label>{props.fieldLabel}<ShowRequired required={required} /></label></Col>
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
          helper={this.vm_helper}
          inForm={props.inForm}
          inputName={props.fieldLabel}
          inputPlaceholder={props.fieldLabel.toLowerCase()}
          item={item}
          onOptionSelect={vm.select}
          options={searchResults}
          searchFunction={vm.search}
          searchMinLength={props.minLength ?? 3}
          searchText={searchText}
          sorting={{ sort: "health_plan_name,name" }}
          tableDisplayProps={["label"]}
        />
      }
    </React.Fragment >
  )
}

const SelectBillingContractFromList = ({ props, state, vm }) => {
  const { readOnly, targetName } = props
  const { item, models } = state
  let modelOptions
  if (valueHelper.isValue(models)) {
    modelOptions = models.map((model) => modelOption(model, vm.displayModel))
    if (!valueHelper.isValue(item)) {
      modelOptions.push(<option key="billing-contract-none" value=""></option>)
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
          value={billingContractHelper.id(item)}>
          {modelOptions}
        </Input>
      </Col>
    </FormGroup>
  )

  function modelOption(model, displayModel) {
    return (
      <option
        key={`billing-contract-${billingContractHelper.id(model)}`}
        value={billingContractHelper.id(model)}>
        {displayModel(model)}
      </option>
    )
  }
}

class SelectBillingContract extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectBillingContractViewModel(
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
        <SearchForBillingContract
          props={this.props}
          state={this.state}
          vm={this.vm}
        />
      )
    }

    return (
      <SelectBillingContractFromList
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

export { SelectBillingContract }
