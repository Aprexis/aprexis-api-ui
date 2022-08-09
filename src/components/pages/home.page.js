import React, { Component } from 'react'
import { HomePageViewModel } from '../view_models/pages'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HomePageViewModel(
      {
        ...props,
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

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { HomePage }

