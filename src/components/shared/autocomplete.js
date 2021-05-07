import React, { Component } from "react"
import { Input, Table } from "reactstrap"
import { Spinner } from "./"
import { AutocompleteViewModel } from "../view_models/shared"
import { valueHelper } from "../../helpers"

const SimpleInputBlock = ({ disabled, inputName, inputPlaceHolder, readOnly, search, searchText }) => {
  return (
    <Input
      autoComplete="off"
      className="form-control-sm"
      disabled={disabled || readOnly}
      name={inputName}
      onChange={search}
      placeholder={inputPlaceHolder}
      readOnly={disabled || readOnly}
      value={valueHelper.makeString(searchText)}
    />
  )
}

const InFormInputBlock = ({ disabled, inputName, inputPlaceHolder, readOnly, search, searchText }) => {
  return (
    <div>
      <SimpleInputBlock
        className="form-control-sm"
        disabled={disabled || readOnly}
        name={inputName}
        onChange={search}
        placeholder={inputPlaceHolder}
        readOnly={disabled || readOnly}
        value={searchText}
      />
    </div>
  )
}

const InputBlock = ({ disabled, inForm, inputName, inputPlaceHolder, readOnly, search, searchText }) => {
  if (valueHelper.isSet(inForm)) {
    return (
      <InFormInputBlock
        disabled={disabled}
        inputName={inputName}
        inputPlaceHolder={inputPlaceHolder}
        readOnly={readOnly}
        search={search}
        searchText={searchText}
      />
    )
  }

  return (
    <SimpleInputBlock
      disabled={disabled}
      inputName={inputName}
      inputPlaceHolder={inputPlaceHolder}
      readOnly={readOnly}
      search={search}
      searchText={searchText}
    />
  )
}

const TableEmpty = ({ inputName, tableDisplayProps }) => {
  return [
    <tr
      colSpan={tableDisplayProps.length}
      key={`${inputName}-row-empty`}>
      <td>
        No matching results found
      </td>
    </tr>
  ]
}

const TableLoading = ({ loading, tableDisplayProps }) => {
  if (!valueHelper.isSet(loading)) {
    return (<React.Fragment />)
  }

  return (
    <tr>
      <td className="text-center spinner" colSpan={tableDisplayProps.length}>
        <Spinner />
      </td>
    </tr>
  )
}

const TableColumn = ({ option, property }) => {
  const propertyValue = extractPropertyValue(option, property)
  return (<td>{propertyValue}</td>)

  function extractPropertyValue(model, property) {
    if (!valueHelper.isValue(model)) {
      return
    }

    const dotIndex = property.indexOf(".")

    if (dotIndex === -1) {
      return model[property]
    }

    const subModel = model[property.substring(0, dotIndex - 1)]
    return extractPropertyValue(subModel, property.substring(dotIndex + 1))
  }
}

const TableColumns = ({ option, rowKey, tableDisplayProps }) => {
  return tableDisplayProps.map(
    (property, propertyIndex) => (
      <TableColumn
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
    onOptionSelect,
    option,
    rowKey,
    selectedOptionString,
    tableDisplayProps
  }
) => {
  const onRowClick = (event) => {
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
    <tr onClick={onRowClick}>
      <TableColumns
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
    inputName,
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

  if (options.length === 0) {
    return (<TableEmpty inputName={inputName} tableDisplayProps={tableDisplayProps} />)
  }

  return options.filter((option) => valueHelper.isValue(option))
    .map(
      (option) => {
        const rowKey = `autocomplete-${valueHelper.snakeCase(inputName)}-${option[tableDisplayProps[0]]}`
        return (
          <TableRow
            addField={addField}
            clearFunction={clearFunction}
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
    inputName,
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
        inputName={inputName}
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
      inputName,
      inputPlaceHolder,
      onOptionSelect,
      options,
      readOnly,
      searchMinLength,
      selectedOptionString,
      tableDisplayProps,
      tableHeaders
    } = this.props
    const { loading, searchText } = this.state

    return (
      <React.Fragment>
        <InputBlock
          disabled={disabled}
          inForm={inForm}
          inputName={inputName}
          inputPlaceHolder={inputPlaceHolder}
          readOnly={readOnly}
          search={this.vm.search}
          searchText={searchText}
        />

        <div className="autocomplete">
          <Table className="table-xs">
            <TableHeader inputName={inputName} tableHeaders={tableHeaders} />
            <TableBody
              addField={this.vm.addField}
              clearFunction={clearFunction}
              inputName={inputName}
              loading={loading}
              onOptionSelect={onOptionSelect}
              options={options}
              searchMinLength={searchMinLength}
              searchText={searchText}
              selectedOptionString={selectedOptionString}
              tableDisplayProps={tableDisplayProps}
            />
          </Table>
        </div>
      </React.Fragment>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { Autocomplete }
