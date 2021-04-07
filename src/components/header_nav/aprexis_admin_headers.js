import React, { Component } from "react"
import Select from "react-select"
import { jsEventHelper, userHelper, valueHelper } from "../../helpers"

class AprexisAdminHeaders extends Component {
  constructor(props) {
    super(props)

    this.state = { username: '' }

    this.actAsOption = this.actAsOption.bind(this)
    this.actAsOptions = this.actAsOptions.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.userLabel = this.userLabel.bind(this)
  }

  actAsOption(actAsUser) {
    return { value: actAsUser.id, label: this.userLabel(actAsUser) }
  }

  actAsOptions(actAsUsers) {
    return actAsUsers.map(this.actAsOption)
  }

  changeUsername(event) {
    const { value } = jsEventHelper.fromInputEvent(event)

    this.setState({ username: value })
  }

  render() {
    const { currentUser, currentAdminUser, actAsUsers } = this.props
    if (!userHelper.hasRole(currentAdminUser, "aprexis_admin") || !valueHelper.isValue(actAsUsers)) {
      return (<React.Fragment />)
    }

    return (
      <Select
        className="aprexis-admin-act-as"
        inputValue={this.state.username}
        onInputChange={this.changeUsername}
        onChange={this.props.actAs}
        options={this.actAsOptions(actAsUsers)}
        value={this.actAsOption(currentUser)}
      />
    )
  }

  userLabel(user) {
    return `${userHelper.fullName(user)} (${userHelper.username(user)})`
  }
}

export { AprexisAdminHeaders }
