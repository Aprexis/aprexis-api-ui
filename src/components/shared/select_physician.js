import React, { Component } from "react"
import { Col, FormGroup } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { valueHelper } from "../../helpers"
import { Autocomplete } from "./"
import { SelectPhysicianViewModel } from "../view_models/shared"

class SelectPhysician extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectPhysicianViewModel(
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
    const { readOnly } = this.props
    const { enableSearch, item, searchText, searchResults } = this.state
    const label = valueHelper.isValue(item) ? this.vm.displayModel(item) : ""
    const rowClassName = valueHelper.isSet(enableSearch) ? "mb-0 pb-0" : ""

    return (
      <React.Fragment>
        <FormGroup row className={rowClassName} style={{ width: "100%" }}>
          <Col xs={2}><label>{this.props.fieldLabel}</label></Col>
          <Col xs={9}>
            <label>{label}</label>
          </Col>
          {
            !valueHelper.isSet(readOnly) &&
            <Col xs={1}>
              <button
                className="mt-0 mb-0 pt-0 pb-0 mr-auto btn btn-mobile"
                onClick={this.vm.toggleSearch}
                type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </Col>
          }
        </FormGroup>
        {
          valueHelper.isSet(enableSearch) && !valueHelper.isSet(readOnly) &&
          <Autocomplete
            clearFunction={this.vm.clearSearch}
            filters={this.props.baseFilters}
            inForm={this.props.inForm}
            inputName={this.props.fieldLabel}
            inputPlaceholder={this.props.fieldLabel.toLowerCase()}
            item={item}
            onOptionSelect={this.vm.select}
            options={searchResults}
            searchFunction={this.vm.search}
            searchMinLength={this.props.minLength ?? 3}
            searchText={searchText}
            sorting={{ sort: "last_name,first_name,middle_name,npi,city,state" }}
            tableDisplayProps={["name", "npi", "city", "state"]}
          />
        }
      </React.Fragment >
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SelectPhysician }
