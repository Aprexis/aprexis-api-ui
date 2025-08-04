import React, { Component } from "react"
import { modelConfigFields, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../helpers/index.js'

function ModelConfigCheckbox({ label, value }) {
  return displayHelper.booleanDisplay(label, value)
}

function ModelConfigString({ label, value }) {
  return displayHelper.display(label, value)
}

function ModelConfigField({ field, helper, modelConfigurable }) {
  if (!valueHelper.isValue(modelConfigFields[field])) {
    console.log(`${field} is not recognized for ${JSON.stringify(modelConfigurable)}`)
  }

  const { label, type } = (modelConfigFields[field] || { label: field, type: 'String' })
  const value = helper.modelConfigField(modelConfigurable, field)

  switch (type) {
    case 'Boolean':
      return (<ModelConfigCheckbox field={field} label={label} value={valueHelper.isSet(value) ? 'Yes' : 'No'} />)

    case 'OneZero':
      return (<ModelConfigCheckbox field={field} label={label} value={value == '1' ? 'Yes' : 'No'} />)

    case 'YesNo':
      return (<ModelConfigCheckbox field={field} label={label} value={value == 'Yes' ? 'Yes' : 'No'} />)

    case 'List':
    case 'Number':
    case 'Select':
    case 'String':
    default:
      return (<ModelConfigString field={field} helper={helper} label={label} modelConfigurable={modelConfigurable} />)
  }
}

class ModelConfigs extends Component {
  render() {
    const { helper, modelConfigurable } = this.props
    const modelConfigFieldNames = helper.modelConfigKeys(modelConfigurable)
    const modelFields = modelConfigFieldNames.map(
      (field) => {
        return (
          <ModelConfigField
            field={field}
            helper={helper}
            key={`${field}-${helper.id(modelConfigurable)}`}
            modelConfigurable={modelConfigurable}
          />
        )
      }
    )

    return (
      <React.Fragment>
        {modelFields}
      </React.Fragment>
    )
  }
}

export { ModelConfigs }
