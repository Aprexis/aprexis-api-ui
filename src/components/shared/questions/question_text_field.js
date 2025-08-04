import { Component } from 'react'
import { FormGroup, Col } from 'reactstrap'
import InputNumber from 'rc-input-number'
import { answerHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { DayTimePicker } from '../index.js'

function DateTimeEntry({ className, onChange, style, value }) {
  return (
    <DayTimePicker
      allowBlank={true}
      allowEdit={true}
      changeDateTime={onChange}
      dateClassName={className}
      dateField={`value_Date`}
      dateStyle={style}
      dateTime={value}
      timeField={`value_Time`}
      timeClassName={className}
      timeStyle={style}
    />
  )
}

function TextEntry({ className, onChange, placeholder, style, value }) {
  return (
    <FormGroup row>
      <Col>
        <input
          className={`form-control ${className}`}
          name='value'
          onChange={onChange}
          placeholder={valueHelper.makeString(placeholder)}
          style={style}
          type='text'
          value={value}
        />
      </Col>
    </FormGroup>
  )
}

function NumberEntry({ className, onChange, placeholder, style, value }) {
  return (
    <FormGroup row>
      <Col>
        <InputNumber
          className={`form-control ${className}`}
          name='value'
          onChange={(newValue) => { onChange('value', newValue) }}
          placeholder={placeholder}
          style={style}
          value={value}
        />
      </Col>
    </FormGroup>
  )
}

class QuestionTextField extends Component {
  render() {
    const { answer, changeDateTime, changeField, changeFieldValue, className, placeholder, style } = this.props
    const value = valueHelper.makeString(answerHelper.value(answer))
    const type = determineType(className)

    switch (type) {
      case 'date-time':
        return (
          <DateTimeEntry
            className={className}
            onChange={changeDateTime}
            style={style}
            value={value}
          />
        )

      case 'number':
        return (
          <NumberEntry
            className={className}
            onChange={changeFieldValue}
            placeholder={placeholder}
            style={style}
            value={value}
          />
        )

      default:
        return (
          <TextEntry
            className={className}
            onChange={changeField}
            placeholder={placeholder}
            style={style}
            value={value}
          />
        )
    }

    function determineType(className) {
      if (!valueHelper.isStringValue(className)) {
        return 'text'
      }

      const parts = className.split(' ')

      if (parts.includes('digits')) {
        return 'number'
      }

      if (parts.includes('datetimepicker')) {
        return 'date-time'
      }

      return 'text'
    }
  }
}

export { QuestionTextField }
