import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { Col, FormGroup } from "reactstrap"
import { Autocomplete } from "./autocomplete.js"
import { ShowRequired } from "./show_required.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"

class SearchForItem extends Component {
  render() {
    const { enableSearch, helper, item, readOnly, required, searchText, searchResults, sorting, tableDisplayProps, vm } = this.props
    const label = valueHelper.isValue(item) ? vm.displayModel(item) : ""
    const rowClassName = valueHelper.isSet(enableSearch) ? "mb-0 pb-0" : ""

    return (
      <React.Fragment>
        <FormGroup row className={rowClassName} style={{ width: "100%" }}>
          <Col xs={2}><label>{this.props.fieldLabel}<ShowRequired required={required} /></label></Col>
          <Col xs={9}>
            {
              !valueHelper.isSet(readOnly) &&
              <button
                className="mt-0 mb-0 pt-0 pb-0 mr-auto btn btn-mobile"
                disabled={readOnly}
                onClick={vm.toggleSearch}
                readOnly={readOnly}
                type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            }
            <label>{label}</label>
          </Col>
        </FormGroup>
        {
          valueHelper.isSet(enableSearch) && !valueHelper.isSet(readOnly) &&
          <Autocomplete
            clearFunction={vm.clearSearch}
            filters={this.props.baseFilters}
            helper={helper}
            inForm={this.props.inForm}
            inputName={this.props.fieldLabel}
            inputPlaceholder={this.props.fieldLabel.toLowerCase()}
            item={item}
            onOptionSelect={vm.select}
            options={searchResults}
            searchFunction={vm.search}
            searchMinLength={this.props.minLength ?? 3}
            searchText={searchText}
            sorting={sorting}
            tableDisplayProps={tableDisplayProps}
          />
        }
      </React.Fragment >
    )
  }
}

export { SearchForItem }
