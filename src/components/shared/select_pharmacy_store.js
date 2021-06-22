import React, { Component } from 'react'
import { Col, FormGroup } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Autocomplete } from "./"
import { SelectPharmacyStoreViewModel } from "../view_models/shared"
import { valueHelper } from '../../helpers'

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
          {
            !valueHelper.isSet(readOnly) &&
            <Col xs={1}>
              <button
                className="mt-0 mb-0 pt-0 pb-0 mr-auto btn btn-mobile"
                disabled={readOnly}
                onClick={this.vm.toggleSearch}
                readOnly={readOnly}
                type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </Col>
          }
        </FormGroup>
        {
          valueHelper.isSet(enableSearch) &&
          <Autocomplete
            clearFunction={this.vm.clearSearch}
            filters={this.props.baseFilters}
            inForm={this.props.inForm}
            inputName={this.props.fieldName}
            inputPlaceholder={this.props.fieldName.toLowerCase()}
            item={item}
            onOptionSelect={this.vm.select}
            options={searchResults}
            searchFunction={this.vm.search}
            searchMinLength={this.props.minLength ?? 3}
            searchText={searchText}
            sorting={{ sort: "name,store_number" }}
            tableDisplayProps={["store", "pharmacy"]}
          />
        }
      </React.Fragment >
    )
  }
}

export { SelectPharmacyStore }
