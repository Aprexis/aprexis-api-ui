import React, { Component } from 'react'
import { ScaleLoader } from 'react-spinners'
import { SetTimeoutMixin } from './'

class Spinner extends Component {
  constructor(props) {
    super(props)

    this.state = { show: false }

    this.refresh = this.refresh.bind(this)
  }

  refresh() {
    this.setState((oldState, oldProps) => { return { show: true } })
  }

  render() {
    return (
      <div
        className={this.state.show ? 'mt-5 mx-auto text-center d-block' : 'd-none'}
        style={{ backgroundColor: 'transparent' }}>
        <ScaleLoader sizeUnit='px' size={150} color='#006298' />
      </div>
    )
  }
}

const setTimeoutSpinner = SetTimeoutMixin(Spinner)
export { setTimeoutSpinner as Spinner }
