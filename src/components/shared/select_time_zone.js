import { Component } from 'react'
import { timeZoneHelper } from '@aprexis/aprexis-api-utility'
import { SelectFieldEditor } from './select_field_editor.js'
import { SelectTimeZoneViewModel } from '../view_models/shared/index.js'

class SelectTimeZone extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectTimeZoneViewModel(props)
  }

  render() {
    const { allowBlank, cols, fieldName, fieldLabel, fieldMethod, fieldXs, helper, model, useAllTimeZones } = this.props

    return (
      <SelectFieldEditor
        allowBlank={allowBlank}
        changeField={this.vm.changeTimeZone}
        cols={cols}
        fieldLabel={fieldLabel}
        fieldMethod={fieldMethod}
        fieldName={fieldName}
        fieldOptions={timeZoneHelper.timeZoneOptions(useAllTimeZones)}
        fieldXs={fieldXs}
        helper={helper}
        model={model}
        required={this.vm.required()}
      />
    )
  }
}

export { SelectTimeZone }
