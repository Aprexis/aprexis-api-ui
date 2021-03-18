import React, { Component } from 'react'
import { Spinner } from '../shared'

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Spinner />
      </div>
    )
  }
}

export { NoMatch }
