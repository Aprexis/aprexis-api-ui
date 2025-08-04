import React, { Component } from "react"
import { userHelper } from '@aprexis/aprexis-api-utility'
import { SelectUser } from '../shared/index.js'
import { jsEventHelper } from '../../helpers/index.js'

class AprexisAdminHeaders extends Component {
  render() {
    const { actAs, currentUser, currentAdminUser } = this.props
    if (!userHelper.hasRole(currentAdminUser, "aprexis_admin")) {
      return (<React.Fragment />)
    }

    return (
      <SelectUser
        asAdmin={true}
        baseFilters={{ for_active: true }}
        enableSearch={true}
        fieldLabel='Act As'
        id={userHelper.id(currentUser)}
        onChange={selectActAs}
        reconnectAndRetry={this.props.reconnectAndRetry}
        tableDisplayProps={['fullName', 'username', 'displayRole']}
      />
    )

    function selectActAs(event) {
      const { value } = jsEventHelper.fromInputEvent(event)
      actAs({ value })
    }
  }
}

export { AprexisAdminHeaders }
