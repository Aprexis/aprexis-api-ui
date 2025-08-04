import { Component } from "react"
import { Col, FormGroup, Input } from "reactstrap"
import { valueHelper } from "@aprexis/aprexis-api-utility"

class SelectItemFromList extends Component {
  constructor(props) {
    super(props)

    this.modelOption = this.modelOption.bind(this)
  }

  render() {
    const { helper, item, modelType, models, readOnly, required, targetName, vm } = this.props
    let id = helper.id(item)
    if (!valueHelper.isNumberValue(id)) {
      id = ""
    }

    let modelOptions
    if (valueHelper.isValue(models)) {
      modelOptions = models.map((model) => this.modelOption(model, vm.displayModel))
      if (!valueHelper.isValue(item)) {
        modelOptions.push(<option key={`${modelType}-none`} value=""></option>)
      }
    }

    return (
      <FormGroup row style={{ width: "100%" }}>
        <Col xs={2}><label>{this.props.fieldLabel}</label></Col>
        <Col xs={9}>
          <Input
            bsSize="sm"
            disabled={valueHelper.isSet(readOnly)}
            name={targetName}
            onChange={vm.selectEvent}
            readOnly={readOnly}
            required={required}
            type="select"
            value={id}>
            {modelOptions}
          </Input>
        </Col>
      </FormGroup>
    )
  }

  modelOption(model, displayModel) {
    const { helper, modelType } = this.props

    return (
      <option
        key={`${modelType}-${helper.id(model)}`}
        value={helper.id(model)}>
        {displayModel(model)}
      </option>
    )
  }
}

export { SelectItemFromList }
