import React, { Component } from 'react'
import { HomePageViewModel } from '../view_models/pages'
import { pathHelper } from '../../helpers'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HomePageViewModel(
      {
        pathEntries: pathHelper.parsePathEntries(window.location),
        ...this.props,
        view: this
      }
    )
  }

  render() {
    return (
      <div>
        HOME PAGE
      </div>
    )
  }
}

export { HomePage }

