import React, { Component } from "react"
import { FormGroup, Col, Input, Row, Table } from "reactstrap"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { Spinner } from "./spinner.js"
import { AutocompleteViewModel } from "../view_models/shared/index.js"

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

const InputBlock = ({ className, disabled, inputName, inputPlaceHolder, readOnly, search, searchText }) => {
  return (
    <Input
      autoComplete="off"
      className={className}
      disabled={disabled || readOnly}
      name={inputName}
      onChange={search}
      placeholder={inputPlaceHolder}
      readOnly={disabled || readOnly}
      value={valueHelper.makeString(searchText)}
    />
  )
}

const TableEmpty = ({ helper, inputName, item, searchText, tableDisplayProps }) => {
  let label = "No matching results found"
  if (valueHelper.isValue(item) && valueHelper.isValue(searchText)) {
    const propertyValue = extractPropertyValue(item, tableDisplayProps[0], helper)
    if (searchText == propertyValue) {
      label = ""
    }
  }

  return [
    <tr
      className="mt-0 mb-0 pt-0 pb-0"
      colSpan={tableDisplayProps.length}
      key={`${inputName}-row-empty`}>
      <td className="mt-0 mb-0 pt-0 pb-0">
        {label}
      </td>
    </tr>
  ]
}

const TableLoading = ({ loading, tableDisplayProps }) => {
  if (!valueHelper.isSet(loading)) {
    return (<React.Fragment />)
  }

  return (
    <tr className="mt-0 mb-0 pt-0 pb-0">
      <td className="text-center spinner mt-0 mb-0 pt-0 pb-0" colSpan={tableDisplayProps.length}>
        <Spinner />
      </td>
    </tr>
  )
}

const TableColumn = ({ helper, option, property }) => {
  const propertyValue = extractPropertyValue(option, property, helper)
  return (<td className="mt-0 mb-0 pt-0 pb-0">{propertyValue}</td>)
}

const TableColumns = ({ helper, option, rowKey, tableDisplayProps }) => {
  return tableDisplayProps.map(
    (property, propertyIndex) => (
      <TableColumn
        helper={helper}
        key={`${rowKey}-${property}-${propertyIndex}`}
        option={option}
        property={property}
      />
    )
  )
}

const TableRow = (
  {
    addField,
    clearFunction,
    helper,
    onOptionSelect,
    option,
    rowKey,
    selectedOptionString,
    tableDisplayProps
  }
) => {
  const onRowClick = (_event) => {
    clearFunction()
    onOptionSelect(option)

    let searchText = ""
    if (valueHelper.isValue(selectedOptionString)) {
      searchText = selectedOptionString(option)
    } else {
      searchText = option[tableDisplayProps[0]]
    }

    addField("searchText", searchText)
  }

  return (
    <tr className="mt-0 mb-0 pt-0 pb-0" onClick={onRowClick}>
      <TableColumns
        helper={helper}
        option={option}
        rowKey={rowKey}
        tableDisplayProps={tableDisplayProps}
      />
    </tr>
  )
}

const TableRows = (
  {
    addField,
    clearFunction,
    helper,
    inputName,
    item,
    loading,
    onOptionSelect,
    options,
    searchMinLength,
    searchText,
    selectedOptionString,
    tableDisplayProps
  }
) => {
  if (valueHelper.isSet(loading) ||
    !valueHelper.isValue(options) ||
    !valueHelper.isStringValue(searchText) ||
    searchText.length < searchMinLength) {
    return (<React.Fragment />)
  }

  const filteredOptions = options.filter((option) => valueHelper.isValue(option))
  if (filteredOptions.length === 0) {
    return (
      <TableEmpty
        helper={helper}
        inputName={inputName}
        item={item}
        searchText={searchText}
        tableDisplayProps={tableDisplayProps}
      />
    )
  }

  return filteredOptions
    .map(
      (option, optionIdx) => {
        const rowKey = `autocomplete-${valueHelper.snakeCase(inputName)}-${optionIdx}`
        return (
          <TableRow
            addField={addField}
            clearFunction={clearFunction}
            helper={helper}
            key={rowKey}
            onOptionSelect={onOptionSelect}
            option={option}
            rowKey={rowKey}
            selectedOptionString={selectedOptionString}
            tableDisplayProps={tableDisplayProps}
          />
        )
      }
    )
}

const TableBody = (
  {
    addField,
    clearFunction,
    helper,
    inputName,
    item,
    loading,
    onOptionSelect,
    options,
    searchMinLength,
    searchText,
    selectedOptionString,
    tableDisplayProps
  }
) => {
  return (
    <tbody>
      <TableLoading loading={loading} tableDisplayProps={tableDisplayProps} />
      <TableRows
        addField={addField}
        clearFunction={clearFunction}
        helper={helper}
        inputName={inputName}
        item={item}
        loading={loading}
        onOptionSelect={onOptionSelect}
        options={options}
        searchMinLength={searchMinLength}
        searchText={searchText}
        selectedOptionString={selectedOptionString}
        tableDisplayProps={tableDisplayProps}
      />
    </tbody>
  )
}

const TableHeaderColumn = ({ header, headerIndex }) => {
  return (
    <th className={headerIndex === 0 ? "th-link" : ""}>
      {header}
    </th>
  )
}

const TableHeader = ({ inputName, tableHeaders }) => {
  if (!valueHelper.isValue(tableHeaders) || tableHeaders.length === 0) {
    return (<React.Fragment />)
  }

  return (
    <thead>
      <tr>
        {renderTableHeaderColumns(inputName, tableHeaders)}
      </tr>
    </thead>
  )

  function renderTableHeaderColumns(inputName, tableHeaders) {
    return tableHeaders.filter((header) => valueHelper.isValue(header))
      .map(
        (header, headerIndex) => {
          const headerColumnKey = `autocomplete-header-${valueHelper.snakeCase(inputName)}-${headerIndex}`
          return (
            <TableHeaderColumn
              header={header}
              headerIndex={headerIndex}
              key={headerColumnKey}
            />
          )
        }
      )
  }
}

const AutocompleteTable = (
  {
    addField,
    clearFunction,
    helper,
    inputName,
    item,
    loading,
    onOptionSelect,
    options,
    searchMinLength,
    searchText,
    selectedOptionString,
    tableDisplayProps,
    tableHeaders
  }
) => {
  return (
    <Table className="table-xs">
      <TableHeader inputName={inputName} tableHeaders={tableHeaders} />
      <TableBody
        addField={addField}
        clearFunction={clearFunction}
        helper={helper}
        inputName={inputName}
        item={item}
        loading={loading}
        onOptionSelect={onOptionSelect}
        options={options}
        searchMinLength={searchMinLength}
        searchText={searchText}
        selectedOptionString={selectedOptionString}
        tableDisplayProps={tableDisplayProps}
      />
    </Table>
  )
}

class Autocomplete extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new AutocompleteViewModel(
      {
        ...props,
        oldSearchText: props.searchText,
        view: this
      }
    )

    this.renderInForm = this.renderInForm.bind(this)
    this.renderOutsideForm = this.renderOutsideForm.bind(this)
    this.renderParts = this.renderParts.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  componentDidUpdate() {
    const stateSearchText = this.state.searchText
    const vmSearchText = this.vm.props.searchText

    if (stateSearchText != valueHelper.makeString(vmSearchText) &&
      stateSearchText == valueHelper.makeString(this.vm.props.oldSearchText)) {
      this.vm.props.oldSearchText = this.vm.props.searchText
      this.vm.addField("searchText", this.vm.props.searchText, this.vm.redrawView)
    }
  }

  render() {
    const {
      clearFunction,
      disabled,
      inForm,
      helper,
      inputName,
      inputPlaceHolder,
      item,
      onOptionSelect,
      options,
      readOnly,
      searchMinLength,
      selectedOptionString,
      tableDisplayProps,
      tableHeaders
    } = this.props
    const { loading, searchText } = this.state
    const autocompleteTable = (
      <AutocompleteTable
        addField={this.vm.addField}
        clearFunction={clearFunction}
        helper={helper}
        inputName={inputName}
        item={item}
        loading={loading}
        onOptionSelect={onOptionSelect}
        options={options}
        searchMinLength={searchMinLength}
        searchText={searchText}
        selectedOptionString={selectedOptionString}
        tableDisplayProps={tableDisplayProps}
        tableHeaders={tableHeaders}
      />
    )

    if (valueHelper.isSet(inForm)) {
      return this.renderInForm(autocompleteTable, disabled, inputName, inputPlaceHolder, readOnly, searchText)
    }

    return this.renderOutsideForm(autocompleteTable, disabled, inputName, inputPlaceHolder, readOnly, searchText)
  }

  renderInForm(autocompleteTable, disabled, inputName, inputPlaceHolder, readOnly, searchText) {
    return (
      <FormGroup row>
        {
          this.renderParts(
            autocompleteTable,
            "form-control-sm",
            disabled,
            inputName,
            inputPlaceHolder,
            readOnly,
            searchText
          )
        }
      </FormGroup>
    )
  }

  renderOutsideForm(autocompleteTable, disabled, inputName, inputPlaceHolder, readOnly, searchText) {
    return (
      <Row>
        {this.renderParts(autocompleteTable, "", disabled, inputName, inputPlaceHolder, readOnly, searchText)}
      </Row>
    )
  }

  renderParts(autocompleteTable, className, disabled, inputName, inputPlaceHolder, readOnly, searchText) {
    return (
      <React.Fragment>
        <Col xs={2}>&nbsp;&nbsp;Search Text</Col>

        <Col xs={4}>
          <InputBlock
            className={className}
            disabled={disabled}
            inputName={inputName}
            inputPlaceHolder={inputPlaceHolder}
            readOnly={readOnly}
            search={this.vm.search}
            searchText={searchText}
          />
        </Col>

        <Col className="autocomplete" xs={6}>
          {autocompleteTable}
        </Col>
      </React.Fragment>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { Autocomplete }
