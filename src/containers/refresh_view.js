import React, { Component } from 'react'
import IdleTimer from 'react-idle-timer'
import { valueHelper } from '../helpers'

class RefreshView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: undefined,
      ticks: 0
    }
    this._idleTimer = undefined

    this.onIdle = this.onIdle.bind(this)
  }

  componentDidMount() {
    this.setState({ location: window.location, ticks: 0 })
  }

  componentDidUpdate() {
    if (valueHelper.isValue(this._idleTimer)) {
      this._idleTimer.reset()
    }
  }

  onIdle(event) {
    const { location, ticks } = this.state
    if (window.location != location) {
      this._idleTimer.pause()
      return
    }

    this.setState(
      (oldState, oldProps) => {
        let { ticks } = oldState
        ++ticks
        return { ticks }
      }
    )

    if (valueHelper.isFunction(this.props.onIdle)) {
      this.props.onIdle(ticks)
    }
  }

  render() {
    const { label, lastPage, objects, pluralLabel } = this.props
    let count = ''

    if (valueHelper.isValue(label)) {
      let objectCount = 0

      if (valueHelper.isValue(lastPage)) {
        objectCount = lastPage.total
      } else if (valueHelper.isValue(objects)) {
        objectCount = objects.length
      }

      if (objectCount === 1) {
        count = `1 ${label}`
      } else if (valueHelper.isValue(pluralLabel)) {
        count = `${objectCount} ${pluralLabel}`
      } else {
        count = `${objectCount} ${label}s`
      }

      return (
        <div className={this.props.className}>
          <IdleTimer
            debounce={250}
            element={document}
            events={this.props.events}
            onIdle={this.onIdle}
            ref={ref => { this._idleTimer = ref }}
            timeout={this.props.timeout}
          />

          {this.props.children}

          <div className="float-right">
            <small>
              {count} Last Updated: {new Date().toLocaleDateString("en-US")}
            </small>
          </div>
        </div>
      )
    }
  }
}

export { RefreshView }
