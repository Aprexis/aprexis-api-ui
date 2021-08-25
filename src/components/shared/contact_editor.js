import React, { Component } from "react"
import { Col, FormGroup, Input } from "reactstrap"
import { valueHelper, fieldHelper, contactHelper } from "../../helpers"

const Person = ({ contactable, hasContactPerson, onChangeField, prefix, readOnly }) => {
  if (!valueHelper.isSet(hasContactPerson)) {
    return (<React.Fragment />)
  }

  return (
    <React.Fragment>
      <FormGroup row>
        <Col xs={2}><label>Contact Person</label></Col>
        <Col xs={4}>
          <Input
            className="form-control"
            disabled={readOnly}
            name={fieldHelper.fieldName("contact_person", prefix)}
            onChange={onChangeField}
            readOnly={readOnly}
            value={valueHelper.makeString(contactHelper.person(contactable, prefix))}
          />
        </Col>
        <Col xs={2}><label>Contact Name</label></Col>
        <Col xs={4}>
          <Input
            className="form-control"
            disabled={readOnly}
            name={fieldHelper.fieldName("contact_name", prefix)}
            onChange={onChangeField}
            readOnly={readOnly}
            value={valueHelper.makeString(contactHelper.name(contactable, prefix))}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Col xs={2}><label>Contact Info</label></Col>
        <Col xs={6}>
          <Input
            className="form-control"
            disabled={readOnly}
            name={fieldHelper.fieldName("contact_info", prefix)}
            onChange={onChangeField}
            readOnly={readOnly}
            value={valueHelper.makeString(contactHelper.info(contactable, prefix))}
          />
        </Col>
        <Col xs={2}><label>Gender</label></Col>
        <Col xs={2}>
          <Input
            className="form-control"
            disabled={readOnly}
            name={fieldHelper.fieldName("gender", prefix)}
            onChange={onChangeField}
            readOnly={readOnly}
            value={valueHelper.makeString(contactHelper.gender(contactable, prefix))}
          />
        </Col>
      </FormGroup>
    </React.Fragment>
  )
}
class ContactEditor extends Component {
  render() {
    const { allowEdit, allowMobile, allowPerson, contactable, onChangeField, prefix } = this.props
    const hasContactPerson = valueHelper.isValue(allowPerson) ? valueHelper.isSet(allowPerson) : true
    const hasMobile = valueHelper.isValue(allowMobile) ? valueHelper.isSet(allowMobile) : true
    const readOnly = valueHelper.isValue(allowEdit) ? !valueHelper.isSet(allowEdit) : true

    return (
      <React.Fragment>
        <Person
          contactable={contactable}
          hasContactPerson={hasContactPerson}
          onChangeField={onChangeField}
          prefix={prefix}
          readOnly={readOnly}
        />

        <FormGroup row>
          <Col xs={2}><label>Phone</label></Col>
          <Col xs={2}>
            <Input
              className="form-control"
              disabled={readOnly}
              name={fieldHelper.fieldName("phone", prefix)}
              onChange={onChangeField}
              readOnly={readOnly}
              value={valueHelper.makeString(contactHelper.phone(contactable, prefix))}
            />
          </Col>
          <Col xs={2}><label>Fax</label></Col>
          <Col xs={2}>
            <Input
              className="form-control"
              disabled={readOnly}
              name={fieldHelper.fieldName("fax", prefix)}
              onChange={onChangeField}
              readOnly={readOnly}
              value={valueHelper.makeString(contactHelper.fax(contactable, prefix))}
            />
          </Col>
          {
            hasMobile &&
            <React.Fragment>
              <Col xs={2}><label>Mobile Phone</label></Col>
              <Col xs={2}>
                <Input
                  className="form-control"
                  disabled={readOnly}
                  name={fieldHelper.fieldName("mobile_phone", prefix)}
                  onChange={onChangeField}
                  readOnly={readOnly}
                  value={valueHelper.makeString(contactHelper.mobilePhone(contactable, prefix))}
                />
              </Col>
            </React.Fragment>
          }
        </FormGroup>

        <FormGroup row>
          <Col xs={2}><label>Email</label></Col>
          <Col xs={10}>
            <Input
              className="form-control"
              disabled={readOnly}
              name={fieldHelper.fieldName("email", prefix)}
              onChange={onChangeField}
              readOnly={readOnly}
              value={valueHelper.makeString(contactHelper.email(contactable, prefix))}
            />
          </Col>
        </FormGroup>
      </React.Fragment>
    )
  }
}

export { ContactEditor }
