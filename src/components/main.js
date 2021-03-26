import React, { Component } from 'react'
import { MainRouting } from './routing'
import { DisplayAlert } from './shared'

class Main extends Component {
  render() {
    return (
      <div>
        <DisplayAlert clearAlert={this.props.clearAlert} parentType='main' />

        <MainRouting />
      </div>
    )
  }
}

export { Main }
