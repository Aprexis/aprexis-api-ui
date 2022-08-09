import React, { Component } from "react"
import { Col, FormGroup, Input } from "reactstrap"
import { valueHelper, fieldHelper, addressHelper } from "@aprexis/aprexis-api-utility"

class AddressEditor extends Component {
  constructor(props) {
    super(props)

    this.isRequired = this.isRequired.bind(this)
  }

  isRequired(fieldName) {
    const { isRequired } = this.props

    if (!valueHelper.isValue(isRequired)) {
      return false
    }

    return isRequired(fieldName)
  }

  render() {
    const { addressable, allowEdit, onChangeField, prefix } = this.props
    const readOnly = valueHelper.isValue(allowEdit) ? !valueHelper.isSet(allowEdit) : true

    return (
      <React.Fragment>
        <FormGroup row>
          <Col xs={2}><label>Address</label></Col>
          <Col xs={10}>
            <Input
              className="form-control"
              disabled={readOnly}
              name={fieldHelper.fieldName("address", prefix)}
              onChange={onChangeField}
              readOnly={readOnly}
              required={this.isRequired(fieldHelper.fieldName("address", prefix))}
              value={valueHelper.makeString(addressHelper.address(addressable, prefix))}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col xs={2}><label>City</label></Col>
          <Col xs={5}>
            <Input
              className="form-control"
              disabled={readOnly}
              name={fieldHelper.fieldName("city", prefix)}
              onChange={onChangeField}
              readOnly={readOnly}
              required={this.isRequired(fieldHelper.fieldName("city", prefix))}
              value={valueHelper.makeString(addressHelper.city(addressable, prefix))}
            />
          </Col>
          <Col xs={1}><label>State</label></Col>
          <Col xs={1}>
            <Input
              className="form-control"
              disabled={readOnly}
              name={fieldHelper.fieldName("state", prefix)}
              onChange={onChangeField}
              readOnly={readOnly}
              required={this.isRequired(fieldHelper.fieldName("state", prefix))}
              value={valueHelper.makeString(addressHelper.state(addressable, prefix))}
            />
          </Col>
          <Col xs={1}><label>ZIP</label></Col>
          <Col xs={2}>
            <Input
              className="form-control"
              disabled={readOnly}
              name={fieldHelper.fieldName("zip_code", prefix)}
              onChange={onChangeField}
              readOnly={readOnly}
              required={this.isRequired(fieldHelper.fieldName("zip_code", prefix))}
              value={valueHelper.makeString(addressHelper.zipCode(addressable, prefix))}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col xs={2}><label>Country</label></Col>
          <Col xs={10}>
            <Input
              className="form-control"
              disabled={readOnly}
              name={fieldHelper.fieldName("country", prefix)}
              onChange={onChangeField}
              readOnly={readOnly}
              required={this.isRequired(fieldHelper.fieldName("country", prefix))}
              value={valueHelper.makeString(addressHelper.country(addressable, prefix))}
            />
          </Col>
        </FormGroup>
      </React.Fragment>
    )
  }
}

export { AddressEditor }
