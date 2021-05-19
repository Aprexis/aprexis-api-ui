import React, { Component } from 'react'
import { Col, FormGroup } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Autocomplete } from "./"
import { SelectPhysicianViewModel } from "../view_models/shared"
import { valueHelper } from '../../helpers'

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

  render() {
    const { readOnly } = this.props
    const { enableSearch, item, searchText, searchResults } = this.state
    const label = valueHelper.isValue(item) ? this.vm.displayModel(item) : ""
    const rowClassName = valueHelper.isSet(enableSearch) ? "mb-0 pb-0" : ""

    return (
      <React.Fragment>
        <FormGroup row className={rowClassName} style={{ width: "100%" }}>
          <Col xs={2}><label>{this.props.fieldName}</label></Col>
          <Col xs={9}>
            <label>{label}</label>
          </Col>
          <Col xs={1}>
            <button
              className="mt-0 mb-0 pt-0 pb-0 mr-auto btn btn-mobile"
              onClick={this.vm.toggleSearch}
              type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </Col>
        </FormGroup>
        {
          valueHelper.isSet(enableSearch) &&
          <FormGroup row className="mt-0 pt-0">
            <Autocomplete
              clearFunction={this.vm.clearSearch}
              disabled={readOnly}
              filters={this.props.baseFilters}
              inForm={this.props.inForm}
              inputName={this.props.fieldName}
              inputPlaceholder={this.props.fieldName.toLowerCase()}
              item={item}
              onOptionSelect={this.vm.select}
              options={searchResults}
              readOnly={readOnly}
              searchFunction={this.vm.search}
              searchMinLength={this.props.minLength ?? 3}
              searchText={searchText}
              sorting={{ sort: "last_name,first_name,middle_name,npi,city,state" }}
              tableDisplayProps={["name", "npi", "city", "state"]}
            />
          </FormGroup>
        }
      </React.Fragment >
    )
  }
}

export { SelectPhysician }
