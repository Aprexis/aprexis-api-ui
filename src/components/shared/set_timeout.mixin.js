import React, { Component } from "react"

const SetTimeoutMixin = Composition => class _SetTimeoutMixin extends Component {
  constructor(props) {
    super(props)

    this._timeouts = []

    this.clearTimeouts = this.clearTimeouts.bind(this)
    this.setTimeout = this.setTimeout.bind(this)
  }

  clearTimeouts() {
    this._timeouts.forEach(clearTimeout)
  }

  componentWillUnmount() {
    this.clearTimeouts()
  }

  render() {
    return (
      <Composition
        clearTimeouts={this.clearTimeouts}
        setTimeout={this.setTimeout}
        _timeouts={this._timeouts}
        {...this.props}
      />
    )
  }

  setTimeout() {
    this._timeouts.push(setTimeout.apply(null, arguments))
  }
}

export { SetTimeoutMixin }
